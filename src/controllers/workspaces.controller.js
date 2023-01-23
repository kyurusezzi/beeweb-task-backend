const workspacesService = require("../services/workspaces.service");
const { getSubdomainById } = require("../services/subdomains.service");
const isNumeric = require("../utils/isNumeric");

const workspacesController = {
  createWorkspace: async (req, res, next) => {
    const data = {
      name: req.body.name,
      subdomain: req.body.subdomain,
    };

    const createdWorkspace = await workspacesService.create(
      data.name,
      data.subdomain,
      req.user.id
    );

    const responseDto = {
      id: createdWorkspace.id,
      name: createdWorkspace.name,
      subdomain: createdWorkspace.subdomain.title,
    };
    res.status(200).send(responseDto);
  },
  getAllWorkspaces: async (req, res, next) => {
    const allWorkspaces = await workspacesService.getAll();

    const responseDto = allWorkspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      subdomain: workspace["subdomain.title"],
    }));

    res.status(200).send(responseDto);
  },
  getWorkspaceById: async (req, res, next) => {
    const { id } = req.params;

    if (!isNumeric(id)) {
      res.status(400).send("Bad request!");
      return;
    }

    const workspace = await workspacesService.getById(Number(id));

    if (!workspace) {
      res.status(404).send("Not found!");
      return;
    }
    res.status(200).send(workspace);
  },
  updateWorkspaceById: async (req, res, next) => {
    const { id } = req.params;

    if (!isNumeric(id)) {
      res.status(400).send("Bad request!");
      return;
    }

    const updatedWorkspace = await workspacesService.updateById(
      Number(id),
      req.body
    );

    if (!updatedWorkspace) {
      res.status(404).send("Not found!");
      return;
    }

    const { title } = await getSubdomainById(updatedWorkspace.subdomainId);

    const responseDto = {
      id: updatedWorkspace.id,
      name: updatedWorkspace.name,
      subdomain: title,
    };

    res.status(200).send(responseDto);
  },
  deleteWorkspaceById: async (req, res, next) => {
    const { id } = req.params;

    if (!isNumeric(id)) {
      res.status(400).send("Bad request!");
      return;
    }

    const deletedWorkspace = await workspacesService.deleteById(Number(id));

    if (!deletedWorkspace) {
      res.status(404).send("Not found!");
      return;
    }
    res.status(200).send(deletedWorkspace);
  },
};

module.exports = {
  workspacesController,
};
