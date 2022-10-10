const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Randomized GIF of ForgottenPunks"),
  async execute(interaction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setImage("https://forgottenpunks.wtf/api/img/gif");
    return interaction.reply({ embeds: [embed] });
  },
};
