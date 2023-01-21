const subdomainsService = require("../services/subdomains.service");

const subdomainsController = {
  suggestSubdomains: async (req, res, next) => {
    const subdomain = req.query.subdomain.trim();
    if (!subdomain) {
      res.status(200).send({
        isAvailable: false,
      });
    } else {
      try {
        const result = await subdomainsService.suggestSubdomains(subdomain);
        res.status(200).send(result);
      } catch (error) {
        console.log(error);
      }
    }
  },
};

module.exports = {
  subdomainsController,
};
