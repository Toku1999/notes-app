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
      docker push tag notes-app tokesh070/notes-app
      docker push tokesh070/notes-app
      '''
    }
  } 
  stage('Deploy') {
    steps {
    sh '''
    docker ps -q --filter "publish=3000" | xargs -r docker stop
    docker ps -aq --filter "publish=3000" | xargs -r docker rm
    
    docker run -d -p 3000:3000 --name notes-app notes-app:latest
    '''
    }
 }
}
}

      
        
