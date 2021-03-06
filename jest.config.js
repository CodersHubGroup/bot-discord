const jestConfig = {
  roots: ['src', 'tests'],
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src', 'tests'],
  collectCoverageFrom: ['./**/*.+(js)'],
  testMatch: ['**/__tests__/**/*.+(js)'],
  setupFilesAfterEnv: ['./tests/setup-env.js'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
}

module.exports = jestConfig
