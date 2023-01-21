const { Router } = require("express");
const {
  subdomainsController,
} = require("../controllers/subdomains.controller");
const router = Router();

router.get("/subdomains/suggestions", subdomainsController.suggestSubdomains);

module.exports = router;
