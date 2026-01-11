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

    // Добавление тегов к заметкам в указанной папке
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

    // Добавление тегов к одному файлу
    async addTagsToFile(file: TFile, tags: string[]) {
        const content = await this.app.vault.read(file);
        const newContent = this.addTagsToContent(content, tags);
        
        if (newContent !== content) {
            await this.app.vault.modify(file, newContent);
        }
    }

    // Добавление тегов к содержимому файла
    addTagsToContent(content: string, tags: string[]): string {
        const lines = content.split('\n');
        let frontmatterEnd = -1;
        let frontmatterStart = -1;
        let inFrontmatter = false;

        // Проверяем наличие frontmatter
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                if (frontmatterStart === -1) {
                    frontmatterStart = i;
                    inFrontmatter = true;
                } else {
                    frontmatterEnd = i;
                    break;
                }
            }
        }

        // Нормализуем теги (удаляем # если есть)
        const normalizedTags = tags.map(tag => tag.replace(/^#/, '').trim());

        if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
            // Есть frontmatter, работаем с ним
            let existingTags: string[] = [];
            let tagsLineIndex = -1;

            for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
                const line = lines[i].trim();
                if (line.startsWith('tags:')) {
                    tagsLineIndex = i;
                    const tagsString = line.substring(5).trim();
                    
                    if (tagsString.startsWith('[') && tagsString.endsWith(']')) {
                        // Формат массива: tags: [tag1, tag2]
                        existingTags = tagsString
                            .slice(1, -1)
                            .split(',')
                            .map(t => t.trim().replace(/['"]/g, ''))
                            .filter(t => t.length > 0);
                    } else if (tagsString.length > 0) {
                        // Одиночный тег: tags: tag1
                        existingTags = [tagsString.replace(/['"]/g, '')];
                    }
                    break;
                }
            }

            // Объединяем существующие теги с новыми (без дубликатов)
            const allTags = [...new Set([...existingTags, ...normalizedTags])];

            if (tagsLineIndex !== -1) {
                // Обновляем существующую строку tags
                lines[tagsLineIndex] = `tags: [${allTags.join(', ')}]`;
            } else {
                // Добавляем новую строку tags после frontmatter start
                lines.splice(frontmatterStart + 1, 0, `tags: [${allTags.join(', ')}]`);
            }
        } else {
            // Нет frontmatter, создаем его
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

    // Получение файлов без тегов
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

    // Проверка наличия тегов в файле
    async fileHasTags(file: TFile): Promise<boolean> {
        const content = await this.app.vault.read(file);
        const lines = content.split('\n');
        let inFrontmatter = false;
        let frontmatterStart = -1;
        let frontmatterEnd = -1;

        // Проверяем frontmatter
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                if (frontmatterStart === -1) {
                    frontmatterStart = i;
                    inFrontmatter = true;
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

        // Проверяем встроенные теги в тексте
        const inlineTagRegex = /#[\w\-\/]+/g;
        if (content.match(inlineTagRegex)) {
            return true;
        }

        return false;
    }

    // Обработка файлов без тегов
    async processUntaggedFiles(): Promise<number> {
        const untaggedFiles = await this.getUntaggedFiles();
        
        if (untaggedFiles.length === 0) {
            new Notice('No untagged files found');
            return 0;
        }

        const tag = this.settings.untaggedTag.replace(/^#/, '').trim();
        const targetFolder = normalizePath(this.settings.untaggedFolder);

        // Создаем папку если её нет
        if (!await this.app.vault.adapter.exists(targetFolder)) {
            await this.app.vault.createFolder(targetFolder);
        }

        let processedCount = 0;

        for (const file of untaggedFiles) {
            try {
                // Добавляем тег
                await this.addTagsToFile(file, [tag]);

                // Перемещаем файл если он не в целевой папке
                if (!file.path.startsWith(targetFolder)) {
                    const newPath = normalizePath(`${targetFolder}/${file.name}`);
                    
                    // Если файл с таким именем уже существует, добавляем суффикс
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

        containerEl.createEl('h2', { text: 'Tag for Everything Settings' });

        // Секция 1: Добавление тегов к существующим заметкам в папке
        containerEl.createEl('h3', { text: 'Add tags to existing notes in folder' });

        new Setting(containerEl)
            .setName('Target folder')
            .setDesc('Select folder to add tags to all notes inside')
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
                .setButtonText('Apply Tags to Folder')
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
                    button.setButtonText('Apply Tags to Folder');
                }));

        // Разделитель
        containerEl.createEl('hr');

        // Секция 2: Обработка заметок без тегов
        containerEl.createEl('h3', { text: 'Untagged notes management' });

        // Счетчик файлов без тегов
        const untaggedInfoSetting = new Setting(containerEl)
            .setName('Untagged notes')
            .setDesc('Number of notes without any tags');

        this.untaggedCountEl = untaggedInfoSetting.descEl.createDiv();
        this.updateUntaggedCount();

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
            .setDesc('Folder where untagged notes will be moved')
            .addText(text => text
                .setPlaceholder('Untagged Notes')
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
                .setButtonText('Process Untagged Notes')
                .setCta()
                .onClick(async () => {
                    button.setDisabled(true);
                    button.setButtonText('Processing...');

                    const count = await this.plugin.processUntaggedFiles();

                    new Notice(`Processed ${count} untagged file(s)`);
                    await this.updateUntaggedCount();

                    button.setDisabled(false);
                    button.setButtonText('Process Untagged Notes');
                }));
    }

    async updateUntaggedCount() {
        const untaggedFiles = await this.plugin.getUntaggedFiles();
        this.untaggedCountEl.setText(`Found ${untaggedFiles.length} untagged note(s)`);
        this.untaggedCountEl.style.fontWeight = 'bold';
        this.untaggedCountEl.style.color = untaggedFiles.length > 0 ? 'var(--text-warning)' : 'var(--text-success)';
    }
}
