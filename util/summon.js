const { EmbedBuilder } = require("discord.js");
const api = require("./api");
const request = require("request");
const util = require("util");
require("dotenv").config();

module.exports = {
  postSummon: async function postSummon(client, summonerId, soulId) {
    const channel = client.channels.cache.get(process.env.POST_SUMMON_CHANNEL);
    const requestPromise = util.promisify(request);
    const { body } = await requestPromise(api.soulmeta(soulId));
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: false };
    });
    const embed = new EmbedBuilder()
      .setTitle("A SoulPunk has been Summoned!")
      .setImage(api.soul(soulId))
      .setThumbnail(api.punknoframe(summonerId))
      .addFields(fields)
      .setURL(
        `https://opensea.io/assets/ethereum/${process.env.SOULS_CONTRACT_ADDRESS}/${soulId}`
      );
    return channel.send({ embeds: [embed] });
  },
};
