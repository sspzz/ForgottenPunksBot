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
      .setTitle(`SoulPunk #${soulId} has been Summoned!`)
      .setImage(api.soul(soulId))
      .setThumbnail(api.punknoframe(summonerId))
      .addFields(fields)
      .setURL(
        `https://opensea.io/assets/ethereum/${process.env.SOULS_CONTRACT_ADDRESS}/${soulId}`
      );
    return channel.send({ embeds: [embed] });
  },
  postCircle: async function postCircle(client, minter, isClaim) {
    const channel = client.channels.cache.get(process.env.POST_SUMMON_CHANNEL);
    const url =
      "https://opensea.io/assets/ethereum/0x41efbce86158f2a54368fe5ce80ce1d496acaa5e/0";
    const embed = new EmbedBuilder()
      .setImage(api.circle())
      .setTitle(`${isClaim ? "Claim" : "Mint"}: Summoning Circle!`)
      .setFooter({ text: `${isClaim ? "Claimed" : "Minted"} by ${minter}` })
      .setURL(url);
    return channel.send({ embeds: [embed] });
  },
};
