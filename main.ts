import { App, Plugin, PluginSettingTab, Setting, TFile, Notice, normalizePath } from 'obsidian';

interface TagForEverythingSettings {
    targetFolder: string;
    tagsToAdd: string;
    untaggedFolder: string;
    untaggedTag: string;
}

const DEFAULT_SETTINGS: TagForEverythingSettings = {
    targetFolder: '',
    tagsToAdd: '',
    untaggedFolder: 'Untagged Notes',
    untaggedTag: 'untagged'
}

export default class TagForEverythingPlugin extends Plugin {
    settings: TagForEverythingSettings;

    async onload() {
        await this.loadSettings();

        this.addSettingTab(new TagForEverythingSettingTab(this.app, this));
    }

    onunload() {
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    // Add tags to notes in specified folder
    async addTagsToFolder(folder: string, tags: string[]): Promise<number> {
        if (!folder || tags.length === 0) {
            new Notice('Please specify both folder and tags');
            return 0;
        }

        const files = this.app.vault.getMarkdownFiles();
        const targetFiles = files.filter(file => file.path.startsWith(folder));

        if (targetFiles.length === 0) {
            new Notice(`No files found in folder: ${folder}`);
            return 0;
        }

        let processedCount = 0;

        for (const file of targetFiles) {
            try {
                await this.addTagsToFile(file, tags);
                processedCount++;
            } catch (error) {
                console.error(`Error processing ${file.path}:`, error);
            }
        }

        return processedCount;
    }

    // Add tags to a single file
    async addTagsToFile(file: TFile, tags: string[]) {
        const content = await this.app.vault.read(file);
        const newContent = this.addTagsToContent(content, tags);
        
        if (newContent !== content) {
            await this.app.vault.modify(file, newContent);
        }
    }

    // Add tags to file content
    addTagsToContent(content: string, tags: string[]): string {
        const lines = content.split('\n');
        let frontmatterEnd = -1;
        let frontmatterStart = -1;

        // Check for frontmatter
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                if (frontmatterStart === -1) {
                    frontmatterStart = i;
                } else {
                    frontmatterEnd = i;
                    break;
                }
            }
        }

        // Normalize tags (remove # if present)
        const normalizedTags = tags.map(tag => tag.replace(/^#/, '').trim());

        if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
            // Has frontmatter, work with it
            let existingTags: string[] = [];
            let tagsLineIndex = -1;

            for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
                const line = lines[i].trim();
                if (line.startsWith('tags:')) {
                    tagsLineIndex = i;
                    const tagsString = line.substring(5).trim();
                    
                    if (tagsString.startsWith('[') && tagsString.endsWith(']')) {
                        // Array format: tags: [tag1, tag2]
                        existingTags = tagsString
                            .slice(1, -1)
                            .split(',')
                            .map(t => t.trim().replace(/['"]/g, ''))
                            .filter(t => t.length > 0);
                    } else if (tagsString.length > 0) {
                        // Single tag: tags: tag1
                        existingTags = [tagsString.replace(/['"]/g, '')];
                    }
                    break;
                }
            }

            // Merge existing tags with new ones (no duplicates)
            const allTags = [...new Set([...existingTags, ...normalizedTags])];

            if (tagsLineIndex !== -1) {
                // Update existing tags line
                lines[tagsLineIndex] = `tags: [${allTags.join(', ')}]`;
            } else {
                // Add new tags line after frontmatter start
                lines.splice(frontmatterStart + 1, 0, `tags: [${allTags.join(', ')}]`);
            }
        } else {
            // No frontmatter, create it
            const newFrontmatter = [
                '---',
                `tags: [${normalizedTags.join(', ')}]`,
                '---',
                ''
            ];
            lines.unshift(...newFrontmatter);
        }

        return lines.join('\n');
    }

    // Get files without tags
    async getUntaggedFiles(): Promise<TFile[]> {
        const files = this.app.vault.getMarkdownFiles();
        const untaggedFiles: TFile[] = [];

        for (const file of files) {
            const hasTags = await this.fileHasTags(file);
            if (!hasTags) {
                untaggedFiles.push(file);
            }
        }

        return untaggedFiles;
    }

    // Check if file has tags
    async fileHasTags(file: TFile): Promise<boolean> {
        const content = await this.app.vault.read(file);
        const lines = content.split('\n');
        let frontmatterStart = -1;
        let frontmatterEnd = -1;

        // Check frontmatter
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                if (frontmatterStart === -1) {
                    frontmatterStart = i;
                } else {
                    frontmatterEnd = i;
                    break;
                }
            }
        }

        if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
            for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
                if (lines[i].trim().startsWith('tags:')) {
                    return true;
                }
            }
        }

        // Check inline tags in text
        const inlineTagRegex = /#[\w\-/]+/g;
        if (content.match(inlineTagRegex)) {
            return true;
        }

        return false;
    }

    // Process untagged files
    async processUntaggedFiles(): Promise<number> {
        const untaggedFiles = await this.getUntaggedFiles();
        
        if (untaggedFiles.length === 0) {
            new Notice('No untagged files found');
            return 0;
        }

        const tag = this.settings.untaggedTag.replace(/^#/, '').trim();
        const targetFolder = normalizePath(this.settings.untaggedFolder);

        // Create folder if it doesn't exist
        if (!await this.app.vault.adapter.exists(targetFolder)) {
            await this.app.vault.createFolder(targetFolder);
        }

        let processedCount = 0;

        for (const file of untaggedFiles) {
            try {
                // Add tag
                await this.addTagsToFile(file, [tag]);

                // Move file if not in target folder
                if (!file.path.startsWith(targetFolder)) {
                    const newPath = normalizePath(`${targetFolder}/${file.name}`);
                    
                    // If file with same name exists, add suffix
                    let finalPath = newPath;
                    let counter = 1;
                    while (await this.app.vault.adapter.exists(finalPath)) {
                        const nameWithoutExt = file.basename;
                        finalPath = normalizePath(`${targetFolder}/${nameWithoutExt}_${counter}.md`);
                        counter++;
                    }
                    
                    await this.app.vault.rename(file, finalPath);
                }

                processedCount++;
            } catch (error) {
                console.error(`Error processing ${file.path}:`, error);
            }
        }

        return processedCount;
    }
}

class TagForEverythingSettingTab extends PluginSettingTab {
    plugin: TagForEverythingPlugin;
    untaggedCountEl: HTMLElement;

    constructor(app: App, plugin: TagForEverythingPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        // Section 1: Add tags to existing notes in folder
        new Setting(containerEl)
            .setName('Bulk tag addition')
            .setHeading();

        new Setting(containerEl)
            .setName('Target folder')
            .setDesc('Choose the folder to add tags to all notes inside')
            .addText(text => text
                .setPlaceholder('folder/subfolder')
                .setValue(this.plugin.settings.targetFolder)
                .onChange(async (value) => {
                    this.plugin.settings.targetFolder = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Tags to add')
            .setDesc('Enter tags separated by commas (e.g., tag1, tag2, tag3). You can use # or not.')
            .addText(text => text
                .setPlaceholder('tag1, tag2, tag3')
                .setValue(this.plugin.settings.tagsToAdd)
                .onChange(async (value) => {
                    this.plugin.settings.tagsToAdd = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Apply tags')
            .setDesc('Add specified tags to all notes in the target folder')
            .addButton(button => button
                .setButtonText('Apply tags to folder')
                .setCta()
                .onClick(async () => {
                    button.setDisabled(true);
                    button.setButtonText('Processing...');
                    
                    const tags = this.plugin.settings.tagsToAdd
                        .split(',')
                        .map(t => t.trim())
                        .filter(t => t.length > 0);

                    const count = await this.plugin.addTagsToFolder(
                        this.plugin.settings.targetFolder,
                        tags
                    );

                    new Notice(`Tags added to ${count} file(s)`);
                    
                    button.setDisabled(false);
                    button.setButtonText('Apply tags to folder');
                }));

        // Separator
        containerEl.createEl('hr');

        // Section 2: Untagged notes management
        new Setting(containerEl)
            .setName('Untagged notes')
            .setHeading();

        // Untagged files counter
        const untaggedInfoSetting = new Setting(containerEl)
            .setName('Notes without tags')
            .setDesc('Number of notes without any tags');

        this.untaggedCountEl = untaggedInfoSetting.descEl.createDiv();
        void this.updateUntaggedCount();

        new Setting(containerEl)
            .setName('Refresh count')
            .setDesc('Update the count of untagged notes')
            .addButton(button => button
                .setButtonText('Refresh')
                .onClick(async () => {
                    await this.updateUntaggedCount();
                    new Notice('Untagged count updated');
                }));

        new Setting(containerEl)
            .setName('Folder for untagged notes')
            .setDesc('Specify the folder where untagged notes will be moved')
            .addText(text => text
                .setPlaceholder('untagged notes')
                .setValue(this.plugin.settings.untaggedFolder)
                .onChange(async (value) => {
                    this.plugin.settings.untaggedFolder = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Tag for untagged notes')
            .setDesc('Tag to add to all untagged notes')
            .addText(text => text
                .setPlaceholder('untagged')
                .setValue(this.plugin.settings.untaggedTag)
                .onChange(async (value) => {
                    this.plugin.settings.untaggedTag = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Process untagged notes')
            .setDesc('Add tag to all untagged notes and move them to specified folder')
            .addButton(button => button
                .setButtonText('Process untagged notes')
                .setCta()
                .onClick(async () => {
                    button.setDisabled(true);
                    button.setButtonText('Processing...');

                    const count = await this.plugin.processUntaggedFiles();

                    new Notice(`Processed ${count} untagged file(s)`);
                    await this.updateUntaggedCount();

                    button.setDisabled(false);
                    button.setButtonText('Process untagged notes');
                }));
    }

    async updateUntaggedCount() {
        const untaggedFiles = await this.plugin.getUntaggedFiles();
        this.untaggedCountEl.setText(`Found ${untaggedFiles.length} untagged note(s)`);
        this.untaggedCountEl.addClass(untaggedFiles.length > 0 ? 'mod-warning' : 'mod-success');
    }
}
