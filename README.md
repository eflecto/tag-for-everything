# Tag for Everything

A powerful Obsidian plugin for mass tag management. Quickly add tags to all notes in a folder, find untagged notes, and organize them automatically.

## Features

### 1. Mass Tag Addition to Folder
- Select any folder in your vault
- Add multiple tags at once to all existing notes in that folder
- Tags are added to the YAML frontmatter
- Preserves existing tags (no duplicates)
- Works with nested folders

### 2. Untagged Notes Management
- Automatically detects all notes without tags
- Shows the count of untagged notes
- Add a specific tag to all untagged notes with one click
- Automatically moves untagged notes to a designated folder
- Helps maintain organization in your vault

## Usage

### Adding Tags to a Folder

1. Open Settings → Tag for Everything
2. Under "Add tags to existing notes in folder":
   - Enter the folder path (e.g., `Projects/Work` or just `Work`)
   - Enter tags separated by commas (e.g., `project, important, work`)
   - Click "Apply Tags to Folder"

All existing notes in that folder will now have these tags in their frontmatter.

### Managing Untagged Notes

1. Open Settings → Tag for Everything
2. Under "Untagged notes management":
   - Click "Refresh" to see how many untagged notes you have
   - Set the folder where untagged notes should be moved (default: `Untagged Notes`)
   - Set the tag to add to untagged notes (default: `untagged`)
   - Click "Process Untagged Notes"

All notes without tags will be tagged and organized in the specified folder.

## Installation

### From Obsidian Community Plugins (Recommended)

1. Open Settings in Obsidian
2. Go to Community Plugins and disable Safe Mode
3. Click Browse and search for "Tag for Everything"
4. Click Install, then Enable

### Manual Installation

1. Download the latest release from GitHub
2. Extract the files to your vault's `.obsidian/plugins/tag-for-everything/` folder
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

## How It Works

### Tag Addition
The plugin adds tags to your notes' YAML frontmatter. If a note doesn't have frontmatter, it creates it. For example:

```markdown
---
tags: [project, work, important]
---

# Your Note Content
```

### Tag Detection
A note is considered "untagged" if it has:
- No YAML frontmatter with a `tags:` field
- No inline tags (like #tag) in the content

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Target folder | Folder to add tags to | (empty) |
| Tags to add | Comma-separated list of tags | (empty) |
| Folder for untagged notes | Where to move untagged notes | `Untagged Notes` |
| Tag for untagged notes | Tag to add to untagged notes | `untagged` |

## Examples

### Example 1: Tagging a Project Folder
You have a folder `Projects/WebsiteRedesign` with 50 notes. You want to tag them all with `project`, `website`, and `2024`.

1. Set Target folder: `Projects/WebsiteRedesign`
2. Set Tags to add: `project, website, 2024`
3. Click "Apply Tags to Folder"

All 50 notes now have these three tags.

### Example 2: Organizing Untagged Notes
You have 100 notes scattered across your vault without any tags.

1. Click "Refresh" to see the count
2. Set Tag for untagged notes: `needs-review`
3. Set Folder for untagged notes: `To Review`
4. Click "Process Untagged Notes"

All 100 notes are now tagged with `needs-review` and moved to the `To Review` folder.

## Compatibility

- Minimum Obsidian version: 0.15.0
- Works on Desktop and Mobile

## Support

If you encounter any issues or have suggestions:
- Open an issue on [GitHub](https://github.com/eflecto/tag-for-everything/issues)
- Describe your problem with as much detail as possible

## Development

```bash
# Clone the repository
git clone https://github.com/eflecto/tag-for-everything.git

# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode (auto-rebuild)
npm run dev
```

## License

MIT License - see LICENSE file for details

## Credits

Created by [eflecto](https://github.com/eflecto)

---

If you find this plugin helpful, please consider giving it a star on GitHub! ⭐
