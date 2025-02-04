module.exports = {
  rootDir: "../..",
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  maxWorkers: "50%",
  modulePathIgnorePatterns: ["<rootDir>/build/"],
  transformIgnorePatterns: ["node_modules/(?!axios|url-join|lodash|flat)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest/fileMock.js",
    "\\.(css|less)$": "<rootDir>/config/jest/styleMock.js",
    "^shared/(.*)": "<rootDir>/src/shared/$1",
    "^icons": "<rootDir>/src/icons",
    "^fonts/(.*)": "<rootDir>/src/fonts/$1",
    "^images/(.*)": "<rootDir>/src/images/$1",
    "^styles/(.*)": "<rootDir>/src/styles/$1",
    "^test/(.*)": "<rootDir>/src/test/$1",
    "^views/(.*)": "<rootDir>/src/views/$1",
    "^env": "<rootDir>/src/env.js",
    "^antd/es/(.*)$": "antd/lib/$1",
  },
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.config.{js,jsx,ts,tsx}",
    "!src/index.js",
    "!src/routing.js",
    "!src/shared/services/global/**/*",
    "!src/icons/**/*",
    "!src/styles/**/*",
    "!src/test/**/*",
    "!src/images/**/*",
    "!src/shared/store/**/*",
    "!src/lib/*.d.ts",
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "coverage", outputName: "report-jest-unit.xml" },
    ],
  ],
  modulePaths: ["<rootDir>/src/"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
