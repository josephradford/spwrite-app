# GitHub Flow Workflow

This project follows [GitHub Flow](https://guides.github.com/introduction/flow/) for development.

## The Workflow

1. **Branch from main** - Create a feature branch from main
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** - Commit regularly with descriptive messages
   ```bash
   git add .
   git commit -m "feat: description of change"
   ```

3. **Push to remote** - Share your work
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Open Pull Request** - Start discussion and review
   ```bash
   gh pr create --title "Feature: Description" --body "Details..."
   ```

5. **Review and discuss** - Collaborate on the PR
   - Address review feedback
   - Push additional commits to the same branch

6. **Merge to main** - When approved and tests pass
   ```bash
   gh pr merge --squash
   ```

7. **Delete feature branch** - Clean up
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/changes

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Branch Protection (Optional)

For team projects, set up branch protection in GitHub:
1. Go to Settings > Branches
2. Add rule for `main` branch
3. Enable: Require pull request reviews before merging
4. Enable: Require status checks to pass
5. Enable: Require branches to be up to date

For solo projects, this is optional but good practice.
