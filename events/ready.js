const { SlashCommandBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
const YAML = require('yaml');

const config = YAML.parse(fs.readFileSync('./config.yml', 'utf8'));

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Bot is ready! Logged in as ${client.user.tag}`);
        
        client.user.setPresence({
            activities: [{ name: config.bot.activity, type: ActivityType.Watching }],
            status: config.bot.status
        });
        
        const commands = [];
        client.commands.forEach(command => {
            commands.push(command.data.toJSON());
        });

        try {
            await client.application.commands.set(commands);
            console.log('Commands registered successfully!');
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    },
};