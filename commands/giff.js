const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const api = require("../util/api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giff")
    .setDescription("Randomized GIF of Framed ForgottenPunks"),
  async execute(interaction) {
    await interaction.deferReply();
    const fileName = "randompunks.gif";
    const fileAttach = new AttachmentBuilder(api.giff(), { name: fileName });
    const embed = new EmbedBuilder()
      .setTitle("Random ForgottenPunks GIF")
      .setImage(`attachment://${fileName}`);
    return interaction.editReply({ embeds: [embed], files: [fileAttach] });
  },
};
