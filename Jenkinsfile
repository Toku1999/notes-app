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
      docker build -t notes-app:latest .
      '''
    }
  }
  stage('Deploy') {
    steps {
      sh '''
      docker stop notes-app || true
      docker rm notes-app || true
      docker run -d -p 3000:3000 --name notes-app notes-app
      '''
    }
  }
}
}
      
        
