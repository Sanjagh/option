config = {
  hooks: { 'pre-commit': 'npm run lint && npm run flow && npm run test' },
};

module.exports = config;
