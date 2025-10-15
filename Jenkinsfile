pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello, World!'
            }
        }
    }

    stage('Build') {
        agent {
            docker {
                image 'node:18-alpine'
                
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

}
