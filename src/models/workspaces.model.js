const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");
const { Subdomain } = require("./subdomains.model");
const { User } = require("./users.model");

const Workspace = sequelize.define("Workspace", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const WorkspaceSubdomain = Workspace.belongsTo(Subdomain, {
  foreignKey: { name: "subdomainId", allowNull: true },
  as: "subdomain",
  onDelete: "CASCADE",
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
  WorkspaceSubdomain,
};
