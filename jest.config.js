module.exports = {
  'clearMocks': true,
  'testEnvironment': 'node',
  'transform': {
    '\\.m?jsx?$': '@swissquote/crafty-preset-jest/src/esm-transformer'
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  'testPathIgnorePatterns': [
    // This is for UI Test, which is resolved by jest-ui.config.js
    '<rootDir>/src/',
    // Ignore the build folder
    '<rootDir>/public/',
    // Ignore vendor fodlers
    '<rootDir>/node_modules/',
  ],
  'moduleFileExtensions': [
    'js',
    'json',
    'node'
  ],
};
