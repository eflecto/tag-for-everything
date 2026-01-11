# Quick Start Guide

Get started with Tag for Everything in 5 minutes!

## Installation

### Option 1: Community Plugins (Recommended)
1. Open Obsidian Settings
2. Go to **Community Plugins** → Disable Safe Mode
3. Click **Browse** → Search for "Tag for Everything"
4. Click **Install** → Click **Enable**

### Option 2: Manual Installation
1. Download latest release from [GitHub](https://github.com/eflecto/tag-for-everything/releases)
2. Extract to `.obsidian/plugins/tag-for-everything/`
3. Reload Obsidian
4. Enable in Settings → Community Plugins

## Two Main Features

### 🏷️ Feature 1: Add Tags to Folder

**Use when**: You have notes in a folder that need the same tags

**Steps**:
1. Settings → Tag for Everything
2. Enter folder path (e.g., `Projects/Work`)
3. Enter tags separated by commas (e.g., `project, work, 2026`)
4. Click **Apply Tags to Folder**

**Result**: All notes in that folder now have those tags ✓

---

### 📁 Feature 2: Organize Untagged Notes

**Use when**: You have notes without any tags

**Steps**:
1. Settings → Tag for Everything
2. Click **Refresh** to see how many untagged notes you have
3. Choose where to move them (default: `Untagged Notes`)
4. Choose what tag to give them (default: `untagged`)
5. Click **Process Untagged Notes**

**Result**: All untagged notes are now tagged and organized ✓

---

## Example Workflows

### Workflow 1: New Project
```
1. Create folder: Projects/NewProject
2. Add some notes
3. Tag all at once:
   - Folder: Projects/NewProject
   - Tags: project, active, 2026
   - Apply
```

### Workflow 2: Clean Up Vault
```
1. Check untagged count (Click Refresh)
2. If many untagged notes:
   - Tag: needs-review
   - Folder: To Review
   - Process
3. Review and organize later
```

### Workflow 3: Client Work
```
1. For each client folder:
   - Add client tag: client, client-name
2. For completed work:
   - Add status tag: completed, archived
```

## Settings Explained

| Setting | What It Does | Example |
|---------|-------------|---------|
| Target folder | Where to add tags | `Projects/Work` |
| Tags to add | Tags to add (comma-separated) | `project, work` |
| Folder for untagged | Where to move untagged notes | `Untagged Notes` |
| Tag for untagged | Tag to give untagged notes | `untagged` |

## Common Questions

**Q: Can I use # with tags?**  
A: Yes! Both `project` and `#project` work.

**Q: Will it remove existing tags?**  
A: No! It only adds new tags.

**Q: How many tags can I add at once?**  
A: As many as you want! Just separate with commas.

**Q: Does it work on mobile?**  
A: Yes! Works on desktop and mobile.

**Q: What if folder name is wrong?**  
A: Nothing happens. You'll see "No files found in folder".

## Tips

✅ **Test first**: Try on a small folder before bulk operations  
✅ **Backup**: Make a vault backup before processing 1000s of notes  
✅ **Be specific**: Use specific folder paths to avoid tagging wrong notes  
✅ **Regular cleanup**: Check for untagged notes weekly  
✅ **Tag conventions**: Use consistent tag names across your vault  

## Next Steps

- Read the full [README](README.md) for detailed information
- Check [EXAMPLES](EXAMPLES.md) for more use cases
- Browse [FAQ](FAQ.md) for common questions
- Report issues on [GitHub](https://github.com/eflecto/tag-for-everything/issues)

## Need Help?

1. Check the [FAQ](FAQ.md)
2. Read the [README](README.md)
3. Open an issue on [GitHub](https://github.com/eflecto/tag-for-everything/issues)

---

**That's it!** You're ready to organize your vault with tags. 🎉

Remember: Start small, test first, and gradually organize your notes!
