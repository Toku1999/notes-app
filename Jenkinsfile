pipeline {
  agent any
  environment {
      IMAGE_NAME = "tokesh070/notes-app:latest"
  }
  stages {
    stage('Clone') {
      steps {
        git branch:'main', url: 'https://github.com/Toku1999/notes-app.git'
      }
    }
    stage('Build') {
      steps {
        sh'''
        docker build -t $IMAGE_NAME .
        '''
      }
    }
    stage('Docker login') {
      steps {
        withCredentials([usernamePassword(credentialsId:'dockerhub', usernameVariable:'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
        }
      }
    }
    stage('push') {
      steps {
        sh '''
        docker push $IMAGE_NAME
        '''
      }
    } 
    stage('Deploy') {
      steps {
      sh '''
      echo "Deploying to EC2 with Docker..."
      docker pull $IMAGE_NAME
      docker stop notes-app || true
      docker rm notes-app || true
      docker run -d -p 3000:3000 --name notes-app $IMAGE_NAME
      '''
      }
   }
}
}

      
        
