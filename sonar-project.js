const scanner = require('sonarqube-scanner')

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: '67933ec40a90b8b72bac5941c5aabc6b76b107f1',
    options: {
      'sonar.projectName': 'My Budget Control App',
      'sonar.projectDescription': 'Description for "My Budget Control App" project building with Node js',
      'sonar.sources': 'src',
      'sonar.tests': 'test'
    }
  },
  () => process.exit()
)
