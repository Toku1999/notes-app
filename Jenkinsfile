pipeline {
agent any
stages {
  stage('clone') {
    steps {
      git branch:'main', url: 'https://github.com/Toku1999/notes-app.git'
    }
  }
  stage('build') {
    steps {
      sh'''
      docker build -t notes-app .
      '''
    }
  }
  stage('deploy') {
    steps {
      sh '''
      docker stop notes-app || true
      docker rm notes-app || true
      docker run -p 3000:3000 --name notes-app notes-app
      '''
    }
  }
}
      
        
