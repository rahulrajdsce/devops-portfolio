
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    sh '''
                        docker run --rm \
                          -v "$PWD":/app \
                          -w /app \
                          node:22-alpine \
                          sh -c "npm ci && npm run check"
                    '''
                }
            }
        }

        stage('Frontend Validation') {
            steps {
                dir('frontend') {
                    sh '''
                        docker run --rm \
                          -v "$PWD":/app \
                          -w /app \
                          node:22-alpine \
                          sh -c "npm ci && npm run build"
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t devops-portfolio-api:ci-${BUILD_NUMBER} ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t devops-portfolio-frontend:ci-${BUILD_NUMBER} ./frontend'
            }
        }
    }

    post {
        success {
            echo 'Validation passed and both Docker images were built successfully.'
        }
        failure {
            echo 'Pipeline failed. Review the stage logs.'
        }
    }
}
