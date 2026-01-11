# Developer Documentation

This document provides technical information for developers who want to contribute to or understand Tag for Everything.

## Project Structure

```
tag-for-everything/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── release.yml
│   └── pull_request_template.md
├── main.ts                 # Main plugin code
├── manifest.json           # Plugin metadata
├── package.json            # NPM dependencies
├── tsconfig.json           # TypeScript configuration
├── esbuild.config.mjs      # Build configuration
├── version-bump.mjs        # Version management script
├── versions.json           # Version history
├── styles.css              # Plugin styles (optional)
├── .gitignore             # Git ignore rules
├── .npmrc                 # NPM configuration
├── LICENSE                # MIT License
├── README.md              # Main documentation
├── README.ru.md           # Russian documentation
├── QUICKSTART.md          # Quick start guide
├── EXAMPLES.md            # Use case examples
├── FAQ.md                 # Frequently asked questions
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guidelines
├── PUBLISHING.md          # Publishing guide
└── DEVELOPMENT.md         # This file
```

## Technology Stack

- **Language**: TypeScript
- **Build Tool**: esbuild
- **API**: Obsidian Plugin API
- **Package Manager**: npm

## Core Components

### 1. Main Plugin Class (`TagForEverythingPlugin`)

The main plugin class that extends Obsidian's `Plugin` class.

**Key Methods**:
- `onload()`: Initializes the plugin and settings
- `addTagsToFolder()`: Adds tags to all notes in a folder
- `addTagsToFile()`: Adds tags to a single file
- `addTagsToContent()`: Modifies file content to add tags
- `getUntaggedFiles()`: Finds all files without tags
- `fileHasTags()`: Checks if a file has tags
- `processUntaggedFiles()`: Tags and moves untagged files

### 2. Settings Tab (`TagForEverythingSettingTab`)

Provides the user interface for plugin configuration.

**Key Methods**:
- `display()`: Renders the settings UI
- `updateUntaggedCount()`: Updates the count of untagged files

### 3. Settings Interface

```typescript
interface TagForEverythingSettings {
    targetFolder: string;      // Folder to add tags to
    tagsToAdd: string;         // Comma-separated tags
    untaggedFolder: string;    // Where to move untagged notes
    untaggedTag: string;       // Tag for untagged notes
}
```

## Key Algorithms

### Tag Addition Algorithm

1. Read file content
2. Parse existing frontmatter (if any)
3. Extract existing tags
4. Normalize new tags (remove #)
5. Merge tags (avoid duplicates)
6. Create/update frontmatter
7. Write back to file

### Frontmatter Parsing

The plugin handles three cases:
1. **No frontmatter**: Creates new frontmatter
2. **Frontmatter without tags**: Adds tags field
3. **Frontmatter with tags**: Merges tags

### Tag Detection

A file is considered untagged if:
- No YAML frontmatter with `tags:` field
- No inline tags (matches regex: `/#[\w\-\/]+/g`)

## Development Setup

### Prerequisites

- Node.js 16+
- npm 7+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/eflecto/tag-for-everything.git
cd tag-for-everything

# Install dependencies
npm install
```

### Development Workflow

```bash
# Start development mode (watches for changes)
npm run dev

# Build for production
npm run build

# Update version
npm version patch|minor|major
```

### Testing

1. Build the plugin:
   ```bash
   npm run build
   ```

2. Copy files to test vault:
   ```bash
   cp main.js manifest.json /path/to/vault/.obsidian/plugins/tag-for-everything/
   ```

3. Reload Obsidian (Ctrl/Cmd + R)

4. Test features:
   - Create test notes
   - Try adding tags to folder
   - Test untagged notes detection
   - Verify tag merging
   - Check mobile compatibility

## Code Style

### TypeScript Guidelines

- Use strict null checks
- Prefer `const` over `let`
- Use async/await for asynchronous code
- Add JSDoc comments for public methods
- Use descriptive variable names

### Example:

```typescript
/**
 * Adds tags to a file's frontmatter
 * @param file - The file to add tags to
 * @param tags - Array of tags to add
 */
async addTagsToFile(file: TFile, tags: string[]): Promise<void> {
    const content = await this.app.vault.read(file);
    const newContent = this.addTagsToContent(content, tags);
    
    if (newContent !== content) {
        await this.app.vault.modify(file, newContent);
    }
}
```

## API Usage

### Obsidian API

Key Obsidian APIs used:

```typescript
// File operations
this.app.vault.getMarkdownFiles()
this.app.vault.read(file)
this.app.vault.modify(file, content)
this.app.vault.rename(file, newPath)

// Folder operations
this.app.vault.createFolder(path)
this.app.vault.adapter.exists(path)

// UI
new Notice(message)
new Setting(containerEl)
```

## Error Handling

### Best Practices

1. **Wrap file operations in try-catch**:
```typescript
try {
    await this.addTagsToFile(file, tags);
} catch (error) {
    console.error(`Error processing ${file.path}:`, error);
}
```

2. **Validate user input**:
```typescript
if (!folder || tags.length === 0) {
    new Notice('Please specify both folder and tags');
    return 0;
}
```

3. **Handle file conflicts**:
```typescript
let counter = 1;
while (await this.app.vault.adapter.exists(finalPath)) {
    finalPath = normalizePath(`${targetFolder}/${nameWithoutExt}_${counter}.md`);
    counter++;
}
```

## Performance Considerations

### Batch Processing

When processing many files:
- Show progress notifications
- Process asynchronously
- Don't block UI thread
- Handle errors gracefully

### Memory Management

- Don't load all file contents at once
- Process files one at a time
- Clean up resources after processing

## Security Considerations

1. **Path Validation**: Use `normalizePath()` for all paths
2. **Content Sanitization**: Don't execute user-provided content
3. **File Permissions**: Respect Obsidian's file access model
4. **Data Integrity**: Preserve existing content and metadata

## Building for Release

### Version Bump

```bash
# Update version in package.json
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# This automatically updates manifest.json and versions.json
```

### Create Release

```bash
# Build production version
npm run build

# Create git tag
git tag -a 1.0.0 -m "Release 1.0.0"
git push origin 1.0.0

# GitHub Actions will create the release
```

## Debugging

### Enable Console Logging

```typescript
console.log('Processing file:', file.path);
console.log('Existing tags:', existingTags);
console.log('New tags:', normalizedTags);
```

### View Console

- Desktop: Ctrl/Cmd + Shift + I
- Mobile: Use remote debugging

### Common Issues

1. **Tags not appearing**: Check frontmatter format
2. **Files not found**: Verify folder path (case-sensitive)
3. **Duplicates created**: Check file renaming logic

## Testing Checklist

Before releasing:

- [ ] Test on empty vault
- [ ] Test on vault with 1000+ notes
- [ ] Test all tag formats (#tag, tag)
- [ ] Test nested folders
- [ ] Test file name conflicts
- [ ] Test on Desktop
- [ ] Test on Mobile
- [ ] Test with special characters in tags
- [ ] Test with existing frontmatter
- [ ] Test with no frontmatter
- [ ] Check performance with large files

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Resources

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Plugin Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [esbuild Documentation](https://esbuild.github.io/)

## Questions?

- Open an issue on GitHub
- Check existing issues for similar questions
- Join Obsidian Discord #plugin-dev channel
