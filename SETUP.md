# Setup Instructions for GitHub

Follow these steps to publish Tag for Everything on GitHub and prepare it for Community Plugins submission.

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository settings:
   - Owner: `eflecto`
   - Repository name: `tag-for-everything`
   - Description: `Mass tag management for Obsidian: add tags to all notes in a folder, find and organize untagged notes automatically.`
   - Visibility: **Public** (required for Community Plugins)
   - Initialize: **Do NOT** add README, .gitignore, or license (we already have them)

3. Click **Create repository**

## Step 2: Push Code to GitHub

Open terminal in the `tag-for-everything` folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial release v1.0.0"

# Add remote
git remote add origin https://github.com/eflecto/tag-for-everything.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set Up Repository

### Add Topics (Tags)

1. Go to https://github.com/eflecto/tag-for-everything
2. Click the gear icon next to "About"
3. Add topics: `obsidian`, `obsidian-plugin`, `obsidian-md`, `tags`, `organization`
4. Add website: `https://obsidian.md`
5. Save changes

### Enable Issues

1. Go to Settings → General
2. Features → Check "Issues"

### Enable Discussions (Optional)

1. Go to Settings → General
2. Features → Check "Discussions"

## Step 4: Build the Plugin

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates `main.js` file that will be included in releases.

## Step 5: Create First Release

### Option A: Using GitHub Web Interface

1. Go to https://github.com/eflecto/tag-for-everything/releases
2. Click **Draft a new release**
3. Click **Choose a tag** → Type `1.0.0` → Click **Create new tag: 1.0.0 on publish**
4. Release title: `1.0.0`
5. Description:
   ```markdown
   # Initial Release
   
   First release of Tag for Everything! 🎉
   
   ## Features
   - Mass tag addition to all notes in a folder
   - Untagged notes detection and organization
   - Support for multiple tags at once
   - Desktop and mobile compatibility
   
   ## Installation
   Download `main.js`, `manifest.json`, and `styles.css` and place them in your vault's `.obsidian/plugins/tag-for-everything/` folder.
   
   ## Documentation
   See [README](https://github.com/eflecto/tag-for-everything#readme) for usage instructions.
   ```
6. Upload files:
   - `main.js`
   - `manifest.json`
   - `styles.css`
7. Click **Publish release**

### Option B: Using Git Tags and GitHub Actions

```bash
# Create and push tag
git tag -a 1.0.0 -m "Release v1.0.0"
git push origin 1.0.0
```

GitHub Actions will automatically create a draft release. You'll need to:
1. Go to https://github.com/eflecto/tag-for-everything/releases
2. Edit the draft
3. Add description
4. Publish

## Step 6: Verify Everything

Check that your repository has:
- [x] Public visibility
- [x] Clear README.md
- [x] MIT License
- [x] manifest.json
- [x] At least one release with main.js, manifest.json, and styles.css
- [x] Topics/tags added
- [x] Clear description

## Step 7: Submit to Community Plugins

Now you're ready to submit! Follow the guide in [PUBLISHING.md](PUBLISHING.md).

Quick summary:
1. Fork https://github.com/obsidianmd/obsidian-releases
2. Add your plugin to `community-plugins.json`
3. Create pull request
4. Wait for review

## Common Issues

### "main.js not found"
Run `npm run build` to create main.js

### "Permission denied"
Make sure you're authenticated with GitHub:
```bash
git config --global user.name "eflecto"
git config --global user.email "your-email@example.com"
```

### "Repository already exists"
If you created an empty repo first:
```bash
git remote add origin https://github.com/eflecto/tag-for-everything.git
git push -u origin main
```

### Build errors
Make sure you have Node.js 16+ installed:
```bash
node --version  # Should be v16 or higher
npm install     # Reinstall dependencies
npm run build   # Try building again
```

## Next Steps After Publishing

1. **Promote**: Share on Obsidian Discord, Reddit, forums
2. **Monitor**: Watch for issues and questions
3. **Update**: Release updates when needed
4. **Engage**: Respond to user feedback

## File Checklist

Before pushing to GitHub, verify these files exist:

```
✅ main.ts (source code)
✅ manifest.json
✅ package.json
✅ tsconfig.json
✅ esbuild.config.mjs
✅ version-bump.mjs
✅ versions.json
✅ .gitignore
✅ .npmrc
✅ LICENSE
✅ README.md
✅ README.ru.md
✅ QUICKSTART.md
✅ EXAMPLES.md
✅ FAQ.md
✅ CHANGELOG.md
✅ CONTRIBUTING.md
✅ PUBLISHING.md
✅ DEVELOPMENT.md
✅ styles.css
✅ .github/workflows/release.yml
✅ .github/ISSUE_TEMPLATE/bug_report.md
✅ .github/ISSUE_TEMPLATE/feature_request.md
✅ .github/pull_request_template.md
```

## Support

If you encounter any issues:
1. Check [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
2. Review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
3. Ask in Obsidian Discord #plugin-dev channel

Good luck! 🚀
