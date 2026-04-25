pipeline {
  agent any
  environment {
      IMAGE_NAME = "tokesh070/notes-app:${BUILD_NUMBER}"
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
      kubectl set image deployment/notes-app notes-app=tokesh070/notes-app:$BUILD_NUMBER
      '''
      }
   }
}
}

      
        
