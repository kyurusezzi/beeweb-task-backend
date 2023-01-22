const { Subdomain } = require("../models/subdomain.model");
const { User } = require("../models/user.model");
const { Workspace } = require("../models/workspace.model");

const { deleteSubdomain } = require("./subdomains.service");

const create = async (name, subdomainTitle, userId) => {
  try {
    const workspace = await Workspace.create(
      {
        name,
        subdomain: {
          title: subdomainTitle,
        },
      },
      {
        include: [
          {
            model: Subdomain,
            as: "subdomain",
          },
        ],
      }
    );
    await join(userId, workspace.id, workspace);
    return workspace;
  } catch (error) {
    console.log(error);
  }
};

const join = async (userId, workspaceId, workspace) => {
  workspace = workspace
    ? workspace
    : await Workspace.findOne({ where: { id: workspaceId } });
  const relation = await workspace.addUser(userId);
  return relation;
};

const getAll = async () => {
  try {
    const allWorkspaces = await Workspace.findAll({
      raw: true,
      include: [
        {
          all: false,
          model: User,
          attributes: ["id"],
        },
      ],
    });
    return allWorkspaces;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const workspace = await Workspace.findOne({
      where: { id },
      include: [{ model: Subdomain, as: "subdomain", attributes: ["title"] }],
    });
    return workspace;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (id, payload) => {
  try {
    const updated = await Workspace.update(payload, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    const { subdomainId } = await Workspace.findOne({
      where: id,
      include: ["subdomain"],
      raw: true,
    });
    const deletedCount = await Workspace.destroy({
      where: {
        id,
      },
    });

    const isDeletedSubdomain = await deleteSubdomain(subdomainId);
    if (deletedCount && isDeletedSubdomain) {
      return {
        deletedCount,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
