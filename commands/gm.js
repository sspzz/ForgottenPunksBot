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
    const embed = new EmbedBuilder()
      .setTitle(`ForgottenPunk #${token}`)
      .setURL(
        `https://opensea.io/assets/ethereum/0x4addac15971ab60ead954b8f15a67518730450e0/${token}`
      )
      .setImage(`https://forgottenpunks.wtf/api/img/gm/${token}`);
    return interaction.reply({ embeds: [embed] });
  },
};
