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
                                bat "npm run test:${params.TEST_SUITE}"
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test results...'
            archiveArtifacts artifacts: 'test-results/**/*.*', fingerprint: true
        }
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
