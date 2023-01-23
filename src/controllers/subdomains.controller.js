const subdomainsService = require("../services/subdomains.service");

const subdomainsController = {
  suggestSubdomains: async (req, res, next) => {
    console.log(req.url);
    console.log(req.query);
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
