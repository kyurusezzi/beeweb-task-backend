const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");

const Subdomain = sequelize.define("Subdomain", {
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = {
  Subdomain,
};
