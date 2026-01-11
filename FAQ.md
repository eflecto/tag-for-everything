# Frequently Asked Questions (FAQ)

## General Questions

### What does this plugin do?
Tag for Everything allows you to:
1. Add tags to all notes in a specific folder at once
2. Find all notes without tags
3. Automatically tag and organize untagged notes

### Why would I need this?
This plugin is useful when you:
- Have many notes that need the same tags
- Want to organize your vault with tags
- Need to find and fix notes without tags
- Are migrating from another system
- Want to bulk-organize your notes

### Does it work with nested folders?
Yes! When you specify a folder, all notes in that folder and its subfolders will be processed.

## Tag Management

### What format should I use for tags?
You can use tags with or without the `#` symbol:
- ✅ `project, work, important`
- ✅ `#project, #work, #important`

Both formats work and will be normalized to the same result.

### Where are tags added?
Tags are added to the YAML frontmatter at the top of your notes:

```markdown
---
tags: [project, work, important]
---

Your note content here...
```

### Will this remove my existing tags?
No! The plugin preserves all existing tags and only adds new ones. It prevents duplicates.

### Can I add multiple tags at once?
Yes! Just separate them with commas: `tag1, tag2, tag3, tag4`

### What if my note already has frontmatter?
The plugin will add tags to existing frontmatter without removing other metadata.

## Untagged Notes

### What counts as an "untagged" note?
A note is untagged if it has:
- No YAML frontmatter with `tags:` field
- No inline tags (like `#tag`) in the content

### Will it find notes with only inline tags?
No. Notes with inline tags (like `#project`) are considered tagged and won't be processed.

### Can I preview untagged notes before processing?
Currently, you can see the count. In a future version, we may add a preview feature.

### What happens to notes when I "Process Untagged Notes"?
Two things:
1. The specified tag is added to the note
2. The note is moved to the specified folder

### Can I just add tags without moving notes?
Not currently. The "Process Untagged Notes" feature both tags and moves notes. If you only want to add tags, use the "Add tags to folder" feature instead.

## Technical Questions

### Does this work on mobile?
Yes! The plugin works on both desktop and mobile versions of Obsidian.

### Will this slow down Obsidian?
No. The plugin only processes notes when you click a button. It doesn't run in the background.

### What if I have thousands of notes?
The plugin can handle large vaults, but processing thousands of notes may take a few seconds. You'll see a progress notification.

### Can I undo changes?
Obsidian doesn't have built-in version control, but you can:
- Use the File Recovery core plugin
- Use git for version control
- Make a backup before bulk operations

### Is my data safe?
Yes! The plugin:
- Only modifies notes when you click a button
- Doesn't delete any content
- Adds tags without removing existing ones
- Follows Obsidian's best practices

## Troubleshooting

### The plugin isn't working
1. Make sure the plugin is enabled (Settings → Community Plugins)
2. Reload Obsidian (Ctrl/Cmd + R)
3. Check the console for errors (Ctrl/Cmd + Shift + I)

### Tags aren't being added
Check that:
- The folder path is correct (case-sensitive)
- You've entered at least one tag
- The notes are actually in the specified folder

### I can't find my untagged notes
After processing:
- Check the folder you specified in settings
- Look for notes with your specified tag

### The count shows 0 but I know I have untagged notes
Click "Refresh" to update the count. If still 0, your notes might have inline tags.

### What if a file with the same name exists in the target folder?
The plugin will add a number suffix: `note_1.md`, `note_2.md`, etc.

## Best Practices

### How should I organize my tags?
Consider:
- Using hierarchical tags: `project/website`, `project/book`
- Creating tag conventions: `status/done`, `status/in-progress`
- Keeping tag names short and consistent

### Should I process all untagged notes at once?
It's safer to:
1. Check the count first
2. Review your settings
3. Process a small folder first as a test
4. Then process all untagged notes

### How often should I check for untagged notes?
Depends on your workflow:
- Weekly: If you create many notes
- Monthly: For maintenance
- After importing: When adding external notes

## Future Features

### What features are planned?
Potential future additions:
- Preview list of untagged notes before processing
- Option to tag without moving notes
- Batch rename tags
- Tag templates

### How can I request a feature?
Open an issue on [GitHub](https://github.com/eflecto/tag-for-everything/issues) with:
- Clear description of the feature
- Use case explaining why it's useful
- Examples of how it would work

### Can I contribute?
Yes! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Still Have Questions?

- Check the [README](README.md) for detailed documentation
- Open an issue on [GitHub](https://github.com/eflecto/tag-for-everything/issues)
- Join the Obsidian Discord and ask in #plugin-help

---

Last updated: January 2026
