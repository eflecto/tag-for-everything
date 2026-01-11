# Use Cases and Examples

This document provides practical examples of how to use Tag for Everything in different scenarios.

## Use Case 1: Organizing a New Project

**Scenario**: You've created 50 notes for a new website project in `Projects/NewWebsite/` and forgot to tag them.

**Solution**:
1. Open Settings → Tag for Everything
2. Set Target folder: `Projects/NewWebsite`
3. Set Tags to add: `project, website, client-abc, 2026`
4. Click "Apply Tags to Folder"

**Result**: All 50 notes now have consistent project tags.

---

## Use Case 2: Semester Notes Organization

**Scenario**: You have 100 class notes from last semester without tags.

**Solution**:
1. Create folder structure:
   ```
   University/
   ├── Fall2025/
   │   ├── Math/
   │   ├── Physics/
   │   └── Chemistry/
   ```

2. For each subject:
   - Target folder: `University/Fall2025/Math`
   - Tags: `university, fall2025, math`
   - Click "Apply Tags to Folder"

**Result**: All notes properly categorized by semester and subject.

---

## Use Case 3: Book Notes Migration

**Scenario**: You're migrating 200 book notes from another app. None have tags.

**Solution**:

1. Import all notes into Obsidian
2. Check untagged count: Settings → Tag for Everything → "Refresh"
3. Set Untagged tag: `imported, needs-review`
4. Set Untagged folder: `Imported/Books`
5. Click "Process Untagged Notes"

**Result**: All imported notes tagged and organized for later review.

---

## Use Case 4: Client Work Organization

**Scenario**: Managing notes for multiple clients, need consistent tagging.

**Solution**:

Create folder structure:
```
Clients/
├── ClientA/
├── ClientB/
└── ClientC/
```

For each client:
1. Target folder: `Clients/ClientA`
2. Tags: `client, client-a, active`
3. Apply tags

Then for completed projects:
1. Target folder: `Clients/ClientA/CompletedProjects`
2. Tags: `archived, completed`
3. Apply tags

**Result**: Clear client organization with status tracking.

---

## Use Case 5: Daily Notes Cleanup

**Scenario**: You have hundreds of daily notes, some without tags.

**Solution**:

1. Tag existing organized notes:
   - Target folder: `Daily/2026`
   - Tags: `daily, 2026`
   - Apply

2. Find and organize untagged dailies:
   - Check untagged count
   - Set Untagged folder: `Daily/Uncategorized`
   - Set Untagged tag: `daily, needs-date`
   - Process

**Result**: All daily notes tagged, untagged ones marked for review.

---

## Use Case 6: Research Paper Organization

**Scenario**: Organizing research notes by topic and status.

**Solution**:

1. By research area:
   ```
   Research/
   ├── AI/
   ├── Biology/
   └── Physics/
   ```
   - Tag each folder with topic: `research, ai` etc.

2. By status:
   - Create tags for status: `draft`, `in-progress`, `published`
   - Manually tag or use folder structure

3. Find unprocessed research:
   - Process untagged notes
   - Tag with: `research, unprocessed`

**Result**: Research organized by topic and status.

---

## Use Case 7: Meeting Notes

**Scenario**: 50+ meeting notes need consistent formatting.

**Solution**:

1. Organize by year:
   - Target folder: `Meetings/2026`
   - Tags: `meeting, 2026`

2. By department:
   - Target folder: `Meetings/2026/Engineering`
   - Tags: `meeting, engineering, team`

3. Action items:
   - Create separate tag workflow
   - Manual tagging or separate plugin

**Result**: All meetings tagged and findable.

---

## Use Case 8: Content Creation Workflow

**Scenario**: Managing blog posts from idea to publication.

**Solution**:

1. Initial ideas (untagged):
   - Process untagged notes
   - Tag with: `blog, idea`
   - Move to: `Blog/Ideas`

2. In progress:
   - Target folder: `Blog/Drafts`
   - Tags: `blog, draft, in-progress`

3. Published:
   - Target folder: `Blog/Published`
   - Tags: `blog, published, 2026`

**Result**: Clear content pipeline with status tracking.

---

## Use Case 9: Personal Knowledge Management

**Scenario**: Building a personal wiki, organizing diverse topics.

**Solution**:

1. Main categories:
   ```
   PKM/
   ├── Technology/
   ├── Philosophy/
   ├── Health/
   └── Finance/
   ```

2. Tag each category:
   - Technology: `pkm, technology, learning`
   - Philosophy: `pkm, philosophy, learning`
   - etc.

3. Cross-referencing:
   - Some notes may need multiple category tags
   - Manually add additional tags as needed

4. Cleanup untagged:
   - Find untagged notes
   - Tag with: `pkm, uncategorized`
   - Review and recategorize

**Result**: Organized knowledge base with findable content.

---

## Use Case 10: Migrating From Another Tool

**Scenario**: Moving 1000+ notes from Evernote/Notion.

**Solution**:

Phase 1 - Import:
1. Import all notes to Obsidian
2. They go to: `Imported/`

Phase 2 - Tag for review:
1. Check untagged count (should be ~1000)
2. Set Untagged tag: `imported, to-review, evernote`
3. Set Untagged folder: `Imported/ToReview`
4. Process untagged notes

Phase 3 - Gradual organization:
1. As you review, move to proper folders
2. Add appropriate tags
3. Remove `to-review` tag when done

**Result**: Systematic migration with clear review process.

---

## Pro Tips

### Tip 1: Tag Naming Conventions
Use consistent conventions:
- Status: `status/draft`, `status/done`
- Type: `type/note`, `type/article`
- Priority: `priority/high`, `priority/low`

### Tip 2: Hierarchical Tags
Use `/` for hierarchy:
- `project/website/frontend`
- `work/client-a/meetings`

### Tip 3: Temporary Tags
Use temporary tags for workflows:
- `to-review` - needs review
- `to-cleanup` - needs cleanup
- `to-expand` - needs more content

### Tip 4: Combination Tagging
Combine features:
1. Tag by folder first (broad categories)
2. Manually add specific tags (detailed categorization)
3. Process untagged (catch missed notes)

### Tip 5: Regular Maintenance
Set up a routine:
- Weekly: Check for untagged notes
- Monthly: Review and update tags
- Quarterly: Clean up unused tags

---

## Common Workflows

### Quick Triage
1. Process all untagged → `to-review`
2. Review and categorize
3. Apply appropriate tags

### Project Setup
1. Create folder structure
2. Apply project tags to folders
3. Add status/priority tags manually

### Archive System
1. Tag active work: `active, 2026`
2. Tag completed work: `archived, completed`
3. Move to archive folders

---

## Questions?

Check the [FAQ](FAQ.md) or open an issue on [GitHub](https://github.com/eflecto/tag-for-everything/issues).
