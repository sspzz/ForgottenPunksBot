const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const api = require("../util/api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make your ForgottenPunk speak!")
    .addIntegerOption((option) =>
      option
        .setName("token")
        .setDescription("Token ID of the ForgottenPunk")
        .setMinValue(0)
        .setMaxValue(999)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("phrase")
        .setDescription("What should it say?")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const token = interaction.options.getInteger("token");
    const phrase = interaction.options.getString("phrase");
    const embed = new EmbedBuilder()
      .setTitle(`ForgottenPunk #${token}`)
      .setURL(
        `https://opensea.io/assets/ethereum/0x4addac15971ab60ead954b8f15a67518730450e0/${token}`
      )
      .setImage(api.say(token, phrase))
    return interaction.editReply({ embeds: [embed] });
  },
};
