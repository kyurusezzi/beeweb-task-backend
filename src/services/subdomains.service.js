const { Op } = require("sequelize");
const { Subdomain } = require("../models/subdomains.model");
const generateSimilarNames = require("../utils/generateSubdomains");

const checkMatchings = async (subdomain) => {
  try {
    const matchings = await Subdomain.findAll({
      where: {
        title: { [Op.startsWith]: subdomain },
      },
      raw: true,
    });

    return matchings;
  } catch (error) {
    console.log(error);
  }
};

const suggestSubdomains = async (subdomain) => {
  const matchingSubdomains = (await checkMatchings(subdomain)).map(
    ({ title }) => title
  );
  return {
    isAvailable: !matchingSubdomains.length,
    suggestions: matchingSubdomains.length
      ? generateSimilarNames(subdomain, matchingSubdomains)
      : [],
  };
};

module.exports = {
  suggestSubdomains,
};
