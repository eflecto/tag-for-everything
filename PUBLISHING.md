# Publishing to Obsidian Community Plugins

This guide explains how to publish Tag for Everything to the Obsidian Community Plugins directory.

## Prerequisites

1. GitHub account (username: eflecto)
2. Repository created at: https://github.com/eflecto/tag-for-everything
3. Plugin tested and working in Obsidian

## Steps to Publish

### 1. Prepare Your Repository

Make sure your repository has:
- [x] `manifest.json` - Plugin metadata
- [x] `main.js` - Compiled plugin code
- [x] `styles.css` - Plugin styles (can be empty)
- [x] `README.md` - Documentation
- [x] `LICENSE` - MIT License

### 2. Create a Release

1. Build your plugin:
   ```bash
   npm install
   npm run build
   ```

2. Create a git tag for your release:
   ```bash
   git tag -a 1.0.0 -m "Initial release"
   git push origin 1.0.0
   ```

3. Create a GitHub release:
   - Go to https://github.com/eflecto/tag-for-everything/releases
   - Click "Draft a new release"
   - Choose your tag (1.0.0)
   - Title: "1.0.0"
   - Description: Describe what's in this release
   - Attach files: `main.js`, `manifest.json`, `styles.css`
   - Publish release

### 3. Submit to Community Plugins

1. Fork the Obsidian releases repository:
   https://github.com/obsidianmd/obsidian-releases

2. Clone your fork:
   ```bash
   git clone https://github.com/eflecto/obsidian-releases.git
   cd obsidian-releases
   ```

3. Add your plugin to `community-plugins.json`:
   ```json
   {
     "id": "tag-for-everything",
     "name": "Tag for Everything",
     "author": "eflecto",
     "description": "Mass tag management for Obsidian: add tags to all notes in a folder, find and organize untagged notes automatically.",
     "repo": "eflecto/tag-for-everything"
   }
   ```

4. Create a pull request:
   ```bash
   git checkout -b add-tag-for-everything
   git add community-plugins.json
   git commit -m "Add Tag for Everything plugin"
   git push origin add-tag-for-everything
   ```

5. Go to your fork on GitHub and create a Pull Request to obsidianmd/obsidian-releases

### 4. Wait for Review

The Obsidian team will review your submission. This can take a few days to a few weeks. They will:
- Check that your plugin works
- Review the code for security issues
- Verify it follows community guidelines

### 5. After Approval

Once approved:
- Your plugin will appear in the Community Plugins browser
- Users can install it directly from Obsidian
- You can publish updates by creating new releases

## Publishing Updates

To publish an update:

1. Update version in `manifest.json` and `package.json`
2. Update `versions.json` with the new version
3. Build and test
4. Create a new git tag and release
5. Users will be notified of the update

## Best Practices

- Test thoroughly before releasing
- Write clear release notes
- Respond to user issues on GitHub
- Keep your README up to date
- Follow semantic versioning (MAJOR.MINOR.PATCH)

## Resources

- [Obsidian Plugin Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Community Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)
- [Obsidian Discord](https://discord.gg/obsidianmd) - #plugin-dev channel

## Checklist Before Submitting

- [ ] Plugin builds without errors
- [ ] Tested on latest Obsidian version
- [ ] README is clear and complete
- [ ] License file is included
- [ ] manifest.json is correct
- [ ] GitHub repository is public
- [ ] At least one release is published
- [ ] Release includes main.js, manifest.json, and styles.css

## Support

If you have questions about the submission process:
- Check the [Plugin Developer Docs](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)
- Ask in the Obsidian Discord #plugin-dev channel
- Review other successful plugin submissions

Good luck with your submission! 🎉
