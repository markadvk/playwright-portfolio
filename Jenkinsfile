pipeline {
    agent any

    tools {
        nodejs "NodeJS_24"
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'functional', 'regression'],
            description: 'Select which test suite to run'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Run UI Tests') {
            steps {
                echo "Running Playwright tests..."
                sh 'npx playwright install --with-deps'

                script {
                    if (params.TEST_SUITE == 'all') {
                        sh 'npm run test'
                    } else {
                        sh "npm run test:${params.TEST_SUITE}"
                    }
                }
            }
        }

        stage('Publish Test Report') {
            steps {
                echo "Publishing Playwright HTML report..."
                sh 'npx playwright show-report --port=9223 &'
            }
        }
    }

    post {
        always {
            echo "Archiving test results..."
            archiveArtifacts artifacts: 'test-results/**/*.*', fingerprint: true
        }
        success {
            echo "✅ Build succeeded!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
