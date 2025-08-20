const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('special-command')
        .setDescription('Owner Only Command'),
    async execute(interaction) {
        if (interaction.user.id !== interaction.guild.ownerId) {
            return await interaction.reply({ content: 'Only the server owner can use this command.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('<:PulseLabs:1407804999966261290> Welcome To Pulse Labs™')
            .setDescription('-# <:pin:1406286094433259610> **Take a little look below to see what information you need to know and press the corresponding button**\n\n> <:chevron:1405232366401753269> **Server Rules**\n> -# Press this button to have a look at our server rules. You may want to have a took at these because if you do anything against these rules, actions will be taken.\n\n> <:chevron:1405232366401753269>**Information**\n> -# This will show information of the server and if you need to know anything it will be in here. This also shows a little about Pulse Labs and what we offer.\n\n> <:chevron:1405232366401753269>**Statistics**\n> -# Use this button to have a look on the server statistics, These will change a lot so don\'t be alarmed if they look off to you.');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('help_button')
                    .setLabel('Server Rules')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('info_button')
                    .setLabel('Information')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('stats_button')
                    .setLabel('Statistics')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.deferReply({ ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.deleteReply();
    },
};