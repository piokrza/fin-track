const pathAliases: Record<string, string> = {
  '#app': 'src/app',
  '#core': 'src/app/core',
  '#auth': 'src/app/feature/auth',
  '#ui': 'src/app/ui',
  '@primeng': 'node_modules/@primeng/themes/aura/$1',
};

const moduleNameMapper = Object.keys(pathAliases).reduce(
  (acc, alias) => ({
    ...acc,
    [`^${alias}/(.*)$`]: `<rootDir>/${pathAliases[alias]}/$1`,
  }),
  {}
);

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper,
};
