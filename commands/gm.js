const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gm")
    .setDescription("GM! Say it back!")
    .addIntegerOption((option) =>
      option
        .setName("token")
        .setDescription("Token ID of the ForgottenPunk")
        .setMinValue(0)
        .setMaxValue(999)
        .setRequired(true)
    ),
  async execute(interaction) {
    const token = interaction.options.getInteger("token");
    const embed = new EmbedBuilder().setImage(
      `https://forgottenpunks.wtf/api/img/gm/${token}`
    );
    return interaction.reply({ embeds: [embed] });
  },
};
