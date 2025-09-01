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

                // ANSI wrapper (requires AnsiColor plugin)
                ansiColor('xterm') {
                    // Force color output from Node/NPM and set terminal type
                    withEnv([
                        'FORCE_COLOR=1',
                        'NPM_CONFIG_COLOR=true',
                        'TERM=xterm-256color'
                    ]) {
                        // Switch Windows cmd to UTF-8 (harmless here)
                        bat 'chcp 65001 >NUL'

                        // Ensure browsers
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
        }

        stage('Publish Report') {
            steps {
                echo "Publishing Playwright reports..."

                // Archive HTML report (optional, useful for download)
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

                // Archive raw test results (JUnit XML)
                archiveArtifacts artifacts: 'test-results/**/*.xml', fingerprint: true

                // Publish interactive HTML report (clickable in Jenkins UI)
                publishHTML(target: [
                    reportName: 'Playwright HTML Report',
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                // Publish JUnit results for Jenkins trend charts
                junit 'test-results/**/*.xml'
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
