module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lowerCase"],
    "subject-empty": [2, "never"],
    "subject-case": [1, "never"],
    "type-case": [2, "always", "lowerCase"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", ["ci", "chore", "docs", "feat", "fix", "perf", "refactor", "revert", "style"]],
  },
};
