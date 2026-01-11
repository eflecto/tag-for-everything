# Contributing to Tag for Everything

Thank you for your interest in contributing to Tag for Everything! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/tag-for-everything.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development

### Building the Plugin

```bash
# Development mode (watches for changes)
npm run dev

# Production build
npm run build
```

### Testing

To test your changes:

1. Build the plugin using `npm run dev` or `npm run build`
2. Copy `main.js` and `manifest.json` to your test vault's `.obsidian/plugins/tag-for-everything/` directory
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

### Code Style

- Use TypeScript
- Follow the existing code style
- Add comments for complex logic
- Keep functions focused and small

## Submitting Changes

1. Make sure your code builds without errors: `npm run build`
2. Test your changes thoroughly
3. Commit your changes with clear, descriptive commit messages
4. Push to your fork
5. Create a Pull Request

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Make sure all tests pass

## Reporting Issues

When reporting issues, please include:

- Obsidian version
- Plugin version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## Feature Requests

Feature requests are welcome! Please:

- Check if the feature has already been requested
- Provide a clear description of the feature
- Explain why it would be useful
- Provide examples of how it would work

## Questions

If you have questions:

- Check the README.md first
- Search existing issues
- Create a new issue with the "question" label

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what is best for the community
- Show empathy towards other community members

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions help make Tag for Everything better for everyone. Thank you for taking the time to contribute!
