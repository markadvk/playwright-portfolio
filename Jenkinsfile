pipeline {
    agent any

    tools {
        nodejs 'NodeJS_24' // Ensure Node.js 24 is installed and configured in Jenkins
    }

    parameters {
        choice(
            name: 'TEST_SUITE', // Parameter to select which test suite to run
            choices: ['all', 'smoke', 'functional', 'regression'], // Define available test suites
            description: 'Select which test suite to run'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm // Checkout the source code from the configured SCM
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install' // Install project dependencies
            }
        }

        stage('Run UI Tests') {
            steps {
                echo 'Running Playwright tests...'

                ansiColor('xterm') {
                    withEnv([
                        'FORCE_COLOR=1',
                        'NPM_CONFIG_COLOR=true',
                        'TERM=xterm-256color'
                    ]) {
                        bat 'chcp 65001 >NUL'
                        bat 'npx playwright install --with-deps'

                        script {
                            if (params.TEST_SUITE == 'all') {
                                bat 'npm run test'
                            } else {
                                bat "npm run test -- --grep @${params.TEST_SUITE}"
                            }
                        }
                    }
                }
            }

            post {
                always {
                    echo 'Archiving HTML report, screenshots, videos, and JUnit results...'

                    // Archive Playwright HTML report
                    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

                    // Archive raw test results (JUnit XML) + screenshots/videos
                    archiveArtifacts artifacts: 'test-results/**', fingerprint: true

                    // Publish JUnit results for trend charts
                    junit 'test-results/**/*.xml'

                    // Optionally, publish HTML report in Jenkins UI
                    publishHTML(target: [
                        reportName: 'Playwright HTML Report',
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: false
                    ])
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
