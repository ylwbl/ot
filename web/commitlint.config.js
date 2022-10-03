module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'add',
        'feat',
        'fix',
        'update',
        'change',
        'docs',
        'test',
        'release',
        'merge',
        'chore',
        'create',
        'remove'
      ]
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'body-empty': [2, 'always'],
    'footer-empty': [2, 'always'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
