const workspacesService = require("../services/workspaces.service");
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
    res.status(200).send(createdWorkspace);
  },
  getAllWorkspaces: async (req, res, next) => {
    const allWorkspaces = await workspacesService.getAll();
    res.status(200).send(allWorkspaces);
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

    res.status(200).send(updatedWorkspace);
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
