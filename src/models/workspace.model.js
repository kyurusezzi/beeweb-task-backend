const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");
const { Subdomain } = require("./subdomain.model");
const { User } = require("./user.model");

const Workspace = sequelize.define("Workspace", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Subdomain.hasOne(Workspace, {
  foreignKey: { name: "subdomainId", allowNull: false },
  as: "subdomain",
  onDelete: "CASCADE",
});

Workspace.belongsTo(Subdomain, {
  foreignKey: { name: "subdomainId", allowNull: false },
  as: "subdomain",
});

Workspace.belongsToMany(User, {
  through: "UserWorkspaces",
  foreignKey: "workspaceId",
});

User.belongsToMany(Workspace, {
  through: "UserWorkspaces",
  foreignKey: "userId",
});

module.exports = {
  Workspace,
  // WorkspaceSubdomain,
};
