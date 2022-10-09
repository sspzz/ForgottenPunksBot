const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("util");
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punk")
    .setDescription("Show a ForgottenPunk")
    .addIntegerOption((option) =>
      option
        .setName("token")
        .setDescription("Token ID of the ForgottenPunk")
        .setMinValue(0)
        .setMaxValue(999)
    ),
  async execute(interaction) {
    const token = interaction.options.getInteger("token");
    if (token < 0 || token > 999) {
      return interaction.reply(
        "Invalid token, please use a value between 0 and 999."
      );
    }
    const requestPromise = util.promisify(request);
    const { body } = await requestPromise(
      `https://forgottenpunks.wtf/api/meta/${token}`
    );
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: true };
    });
    const embed = new EmbedBuilder()
      .setTitle(metaJSON.name)
      .setURL(
        `https://opensea.io/assets/ethereum/0x4addac15971ab60ead954b8f15a67518730450e0/${token}`
      )
      .setImage(`https://forgottenpunks.wtf/api/img/framed/${token}`)
      .addFields(fields);
    return interaction.reply({ embeds: [embed] });
  },
};
