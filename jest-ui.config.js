module.exports = {
  'clearMocks': true,
  'transform': {
    '^.+\\.jsx?$': 'babel-jest'
  },
  'testMatch': [
    '<rootDir>/src/**/*.spec.js?(x)',
  ],
  'transformIgnorePatterns': [
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
  ],
  'snapshotSerializers': [
    'enzyme-to-json-default-props/serializer',
  ],
  'setupFiles': [
    '<rootDir>/config/enzyme-init.js',
    '<rootDir>/config/test-init.js',
  ],
  'setupFilesAfterEnv': [
    '<rootDir>/config/test-index.js'
  ],
};
