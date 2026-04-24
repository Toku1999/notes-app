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
    docker ps -q --filter "publish=3000" | xargs -r docker stop
    docker ps -aq --filter "publish=3000" | xargs -r docker rm
    
    ```
    docker run -d -p 3000:3000 --name notes-app notes-app:latest
    '''
    ```
  }
}
}

      
        
