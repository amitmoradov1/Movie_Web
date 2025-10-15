pipeline {
    agent any

    stages {
            stage('Hello') {
                steps {
                    echo 'Hello, World!'
                }
            }

        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reUseNode true
                }

            }

            steps{
                sh '''
                npm ci
                npm run build
                ls -la
                '''

            }
        }

        stage('Deploy') {
            steps {
                sh'''
                npm install netlify-cli -g
                netlify --version
                '''
            }
        }
    }
}
