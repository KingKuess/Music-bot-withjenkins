require('dotenv').config();

const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');
const { YoutubeiExtractor } = require("discord-player-youtubei");
const { SpotifyExtractor, SoundCloudExtractor } = require("@discord-player/extractor");

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

const player = new Player(client, client.config.opt.discordPlayer);

(async () => {
    await player.extractors.register(YoutubeiExtractor, {
        innertubeConfigRaw: {
            player_id: '0004de42'
        }
    });

    await player.extractors.register(SpotifyExtractor, client.config.opt.spotify || {});
    await player.extractors.register(SoundCloudExtractor, {});

    console.log('Extractors loaded: YouTube, Spotify, SoundCloud');
})();

console.clear();
require('./loader');

client.login(client.config.app.token).catch(async (e) => {
    if (e.message === 'An invalid token was provided.') {
        require('./process_tools').throwConfigError('app', 'token', '\n\t   ❌ Invalid Token Provided! ❌ \n\tChange the token in the config file\n');
    } else {
        console.error('❌ An error occurred while trying to login to the bot! ❌ \n', e);
    }
});
