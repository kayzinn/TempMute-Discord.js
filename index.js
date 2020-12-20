const Discord = require("discord.js"); //install discord.js, npm i discord.js (in terminal)
const client = new Discord.Client();
const ms = require("ms"); //install ms, npm i ms (in terminal)

let prefix = ("/") //You can change this parameter

client.on('ready', () => {
    console.log(`i'm ready!`);
 });

 client.on('message', (message) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g); //we have declared the message command arguments
    const command = args.shift().toLowerCase();



    if(command == "mute"){
        let permissions = message.member.hasPermission("KICK_MEMBERS") || message.member.roles.has("ID-ROLE"); //We declare the necessary permissions to be able to execute the command || We declare the role that is necessary to be able to execute the command
        let user = message.mentions.members.first();
        let time = args[1]
        let reason = args.slice(2).join(' ');
        let mutedchannel = client.channels.cache.get('CHANNEL-ID'); //We declare the channel where the message about the mute will be sent
        let mutedrole =  message.guild.roles.cache.get("MUTEROLE-ID"); //We declare the id of the muted role
    
         
        if(!permissions) return message.channel.send("You don't have permissions to use this command!");
        if(!user) return message.channel.send("You need mention a member!");
        if(!time) return message.channel.send("You need declare the time of the mute!");
        if(!reason) return message.channel.send("You need declare the reason of the mute!")
    
        
        user.roles.add(mutedrole);

        setTimeout(function(){

            user.roles.remove(mutedrole);



        }, ms(time));

        mutedchannel.send(`--------------------------------------------------\n:no_entry: **Member:** ${user}\n:timer: ** Time:**  ${time} \n:pencil: ** Reason:**  ${reason} \n:medal: ** STAFF:**  ${message.author}`);


    }


 });

 client.login('TOKEN'); //Your token bot