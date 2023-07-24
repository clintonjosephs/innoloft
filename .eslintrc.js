module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    rules: {
      // Add any additional rules or overrides here
    },
  };
  