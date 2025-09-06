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

                    // === Deploy to GitHub Pages ===
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        bat '''
                            REM === Set local variables ===
                            set REPORT_DIR=playwright-report
                            set TARGET_DIR=reports

                            REM === Git setup for CI user ===
                            git config user.name "jenkins"
                            git config user.email "jenkins@ci"

                            REM === Prepare a temporary folder ===
                            rmdir /s /q tmp 2>nul || echo "no tmp folder"
                            mkdir tmp
                            xcopy %REPORT_DIR% tmp /E /I /Y

                            REM === Initialize a new git repo in tmp ===
                            cd tmp
                            git init
                            git checkout -b gh-pages

                            REM === Put reports into /reports ===
                            mkdir %TARGET_DIR%
                            xcopy * %TARGET_DIR% /E /I /Y

                            REM === Commit and push to GitHub Pages ===
                            git add .
                            git commit -m "ci: update Playwright report %GIT_COMMIT%"

                            git push --force https://%GITHUB_TOKEN%@github.com/markadvk/playwright-portfolio.git gh-pages:gh-pages
                        '''
                    }
                }
            }
        }

        // stage('Deploy Reports') {
        //     when {
        //         expression { env.GIT_BRANCH == 'origin/main' }
        //     }
        //     steps {
        //         // Generate gitHub token and store it in Jenkins credentials
        //         // Jenkins: Manage Jenkins → Credentials → Secret Text → ID = github-token
        //         withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
        //             bat '''
        //                 REM === Set local variables ===
        //                 set REPORT_DIR=playwright-report
        //                 set TARGET_DIR=reports

        //                 REM === Git setup for CI user ===
        //                 git config user.name "jenkins"
        //                 git config user.email "jenkins@ci"

        //                 REM === Prepare a temporary folder ===
        //                 rmdir /s /q tmp 2>nul || echo "no tmp folder"
        //                 mkdir tmp
        //                 xcopy %REPORT_DIR% tmp /E /I /Y

        //                 REM === Initialize a new git repo in tmp ===
        //                 cd tmp
        //                 git init
        //                 git checkout -b gh-pages

        //                 REM === Put reports into /reports ===
        //                 mkdir %TARGET_DIR%
        //                 xcopy * %TARGET_DIR% /E /I /Y

        //                 REM === Commit and push to GitHub Pages ===
        //                 git add .
        //                 git commit -m "ci: update Playwright report %GIT_COMMIT%"

        //                 git push --force https://%GITHUB_TOKEN%@github.com/markadvk/playwright-portfolio.git gh-pages:gh-pages
        //             '''
        //         }
        //     }
        // }

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
