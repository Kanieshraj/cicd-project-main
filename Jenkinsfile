pipeline {
  agent any

  environment {
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Images') {
      steps {
        echo '🔧 Building Docker images (no cache)...'
        bat 'docker-compose build --no-cache'
      }
    }

    stage('Stop Old Containers') {
      steps {
        echo '🛑 Stopping old containers...'
        bat 'docker-compose down --remove-orphans'
      }
    }

    stage('Deploy New Containers') {
      steps {
        echo '🚀 Starting new containers...'
        bat 'docker-compose up -d'
      }
    }

    stage('Verify Backend Logs') {
    steps {
        echo 'Backend container logs:'
        bat 'docker logs cicd-project-backend-1'
    }
}
  }

  post {
    success {
      echo '✅ Application successfully deployed!'
    }
    failure {
      echo '❌ Deployment failed.'
    }
  }
}
