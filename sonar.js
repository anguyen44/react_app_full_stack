const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "https://kali-code.enedis.fr/sonar",
    token: "sqp_85779c8b974da011e5d94b204367ee126e707057",
    options: {
      "sonar.sources": "src",
      "sonar.projectKey": "d0r_doors-ihm",
      "sonar.testExecutionReportPaths": "coverage/test-reporter.xml",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.exclusions":
        "**/*test.js,**/*test.ts,**/*test.tsx,**/*config.js,**/*model.js,**/*model.ts,**/*stories.js,**/*stories.ts,**/*saga.js,**/*saga.ts,**/*slice.js,**/*slice.ts,**/*selector.js,**/*selector.ts,**/test/mocks/**",
    },
  },
  () => process.exit(),
);
