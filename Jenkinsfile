
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
            echo 'Both Docker images built successfully.'
        }
        failure {
            echo 'Pipeline failed. Review the stage logs.'
        }
    }
}
