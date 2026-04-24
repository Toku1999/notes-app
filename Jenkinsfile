pipeline {
agent any
stages {
  stage('Clone') {
    steps {
      git branch:'main', url: 'https://github.com/Toku1999/notes-app.git'
    }
  }
  stage('Build') {
    steps {
      sh'''
      docker build -t tokesh070/notes-app:latest .
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
      docker push tokesh070/notes-app:latest
      '''
    }
  } 
  stage('Deploy') {
    steps {
    sh '''
    docker stop notes-app || true
    docker rm notes-app || true
    docker pull tokesh070/notes-app:latest
    docker run -d -p 3000:3000 --name notes-app tokesh070/notes-app:latest
    '''
    }
 }
}
}

      
        
