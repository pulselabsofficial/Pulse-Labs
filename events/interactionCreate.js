const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'oops, this command doesnt work, blame the developer :sob:', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'info_button': {
                    const infoEmbed = new EmbedBuilder()
                        .setTitle('<:PulseLabs:1407804999966261290> Pulse Labs™ - Server Information')
                        .setDescription('> **<:chevron:1405232366401753269> Server Created**\n> <t:1754523060:d>\n\n> **<:chevron:1405232366401753269> Support Tickets**\n> <#1402797885057273977>\n\n> **<:chevron:1405232366401753269>What We Do**\n> Here at Pulse Labs, We are here to help and improve your discord experience. How we do that you may ask, we host discord bots that you can add to your server and use completely for free. We also offer Custom discord bot creation, this is for or anyone looking to get a custom discord bot coded for your server. We are expanding faster than expected!');

                    await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
                    return;
                }

                case 'help_button': {
                    const rulesEmbed = new EmbedBuilder()
                        .setTitle('<:PulseLabs:1407804999966261290> Pulse Labs™ - Server Rules')
                        .setDescription('**<:chevron:1405232366401753269> No Racism**\n-# *Any form of racism, including slurs, stereotypes, derogatory remarks, or discriminatory behaviour based on race, ethnicity, or nationality is strictly prohibited. Violations will result in immediate removal or banning from the community, with no warnings given. This includes both direct and indirect expressions, whether in public posts, private messages, images, or usernames.*\n\n**<:chevron:1405232366401753269> Advertising**\n-# *Promoting or advertising your own Discord server without prior permission from the moderators is prohibited. Offenders will first receive a warning; repeated violations will result in a ban. This rule applies to all forms of advertising, including direct messages, profile links, and public posts.* **Approved sponsors are exempt from this rule.**\n\n**<:chevron:1405232366401753269> No Gore Allowed**\n-# *Posting, sharing, or linking to any pornographic, sexually explicit, or otherwise NSFW (Not Safe For Work) material is strictly forbidden. This includes images, videos, audio, written descriptions, or links to such content. Any violation will result in an immediate ban, with no warnings. This rule applies to all areas of the community, including public chats, private messages, and usernames.*\n\n**<:chevron:1405232366401753269> No Punishment Evasion**\n-# *Creating or using alternate accounts to bypass a punishment, such as a mute, kick, or ban, is strictly prohibited. Any alternate account used for ban evasion will be permanently banned, and the original account\'s punishment may be extended. This includes attempts to hide your identity, re-join under a different name, or otherwise circumvent moderation actions.*\n\n**<:chevron:1405232366401753269> No Furry or Cub indoctrination.**\n-# *Posting, promoting, or encouraging pro-furry content is not permitted on this server. Any member suspected of engaging in inappropriate conduct toward minors or attempting to influence them in any sexual or harmful manner will be subject to a formal review by the moderation team. If found in violation, the member will be permanently banned to protect the safety and well-being of our community.*\n\n**<:chevron:1405232366401753269> No Spamming**\n-# *Do not flood chats with repeated messages, excessive emojis, unnecessary mentions, or disruptive content. Spam makes it harder for members to communicate and enjoy the server. Keep messages relevant and respectful so everyone can participate in peace. Repeated spamming may result in warnings, mutes, or bans, depending on severity. Please don\'t spam , I know you want to , but please let people live in peace.*');

                    await interaction.reply({ embeds: [rulesEmbed], ephemeral: true });
                    return;
                }

                case 'stats_button': {
                    const guild = interaction.guild;

                    // Verification level text
                    const verificationLevels = {
                        0: 'None',
                        1: 'Low',
                        2: 'Medium',
                        3: 'High',
                        4: 'Very High'
                    };

                    // Uptime formatter
                    function formatUptime(ms) {
                        const sec = Math.floor(ms / 1000) % 60;
                        const min = Math.floor(ms / (1000 * 60)) % 60;
                        const hrs = Math.floor(ms / (1000 * 60 * 60)) % 24;
                        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
                        return `${days}d ${hrs}h ${min}m ${sec}s`;
                    }

                    const statsEmbed = new EmbedBuilder()
                        .setTitle('<:PulseLabs:1407804999966261290> Pulse Labs™ - Server Stats')
                        .setDescription('> **<:chevron:1405232366401753269> Server Owner**\n> <@751577036925042688>\n\n> **<:chevron:1405232366401753269> Member Count**\n> \`' + guild.memberCount + '\`\n\n> **<:chevron:1405232366401753269> Server Created**\n> <t:' + Math.floor(guild.createdTimestamp / 1000) + ':R>\n\n> **<:chevron:1405232366401753269> Boost Count**\n> \`' + guild.premiumSubscriptionCount + ' (Level ' + guild.premiumTier + ')\`');

                    await interaction.reply({ embeds: [statsEmbed], ephemeral: true });
                    return;
                }
            }
        }
    },
};