const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('Developed By: SaturnKai', {type:'PLAYING'});
    console.log('INFO: Voice Channel Alerts has been successfully enabled!');
});

client.on('voiceStateUpdate', (oldUser, newUser) => {
    const alertTextChannel = client.channels.cache.find(channel => channel.name === config.alertChannelName);
    const newVoiceChannel = newUser.channelID;
    const oldVoiceChannel = oldUser.channelID;

    if (oldVoiceChannel != newVoiceChannel){
        if (oldVoiceChannel == null){
            channelName = capitalize(client.channels.cache.get(newVoiceChannel).name);
            alertTextChannel.send(createEmbed('#00FF00', 'Voice Channel Alert', 'User ' + newUser.member.displayName + ' Joined The ' + channelName + ' Voice Call!', newUser.member.user));
        } else if (newVoiceChannel == null){
            channelName = capitalize(client.channels.cache.get(oldVoiceChannel).name);
            alertTextChannel.send(createEmbed('#FF0000', 'Voice Channel Alert', 'User ' + newUser.member.displayName + ' Left The ' + channelName + ' Voice Call!', newUser.member.user));
        } else if (oldVoiceChannel !== null && newVoiceChannel !== null){
            oldChannelName = capitalize(client.channels.cache.get(oldVoiceChannel).name);
            newChannelName = capitalize(client.channels.cache.get(newVoiceChannel).name);
            alertTextChannel.send(createEmbed('#FFFF00', 'Voice Channel Alert', 'User ' + newUser.member.displayName + ' Switched From ' + oldChannelName + ' To ' + newChannelName + '!', newUser.member.user));
        }
    }
});

function createEmbed(color, title, description, member){
    var embed = new Discord.MessageEmbed().setColor(color).setTitle(title).setDescription(description).setTimestamp().setFooter(member.username, member.avatarURL());
    return embed;
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

client.login(config.token);