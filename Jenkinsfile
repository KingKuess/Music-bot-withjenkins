pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'sudo docker build -t music-bot .'
            }
        }
        stage('Remove Previous Container') {
            steps {
                sh '''
                if sudo docker ps | grep -q music-bot-''' + env.BRANCH_NAME + '''; then
                    sudo docker rm -f music-bot-''' + env.BRANCH_NAME + '''
                fi'''
            }
        }
        stage('Run') {
            steps {
                withCredentials([string(credentialsId: 'token', variable: 'token')]) {
                    sh 'sudo docker run --restart=always --name music-bot-' + env.BRANCH_NAME + ' -e DISCORD_TOKEN=$token -e GUILD_ID=$GUILD -d music-bot'
                }
            }
        }
    }
}