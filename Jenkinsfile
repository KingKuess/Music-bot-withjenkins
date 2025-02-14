pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t music-bot .'
            }
        }
        stage('Remove Previous Container') {
            steps {
                sh '''
                if docker ps | grep -q music-bot-''' + env.BRANCH_NAME + '''; then
                    docker rm -f music-bot-''' + env.BRANCH_NAME + '''
                fi'''
            }
        }
        stage('Run') {
            steps {
                withCredentials([string(credentialsId: 'discord_token', variable: 'discord_token'),
                                string(credentialsId: 'guild', variable: 'guild')]) {
                    sh 'docker run --restart=always --name music-bot-' + env.BRANCH_NAME + ' -e DISCORD_TOKEN=$discord_token -e GUILD_ID=$guild -d music-bot'
                }
            }
        }
    }
}
