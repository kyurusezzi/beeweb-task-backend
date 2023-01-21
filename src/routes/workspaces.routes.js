const { Router } = require("express");
const { authenticate } = require("../middlewares/auth.middleware");

const {
  workspacesController,
} = require("../controllers/workspaces.controller");
const router = Router();

router
  .use(authenticate)
  .post("/workspaces", workspacesController.createWorkspace)
  .get("/workspaces", workspacesController.getAllWorkspaces)
  .get("/workspaces/:id", workspacesController.getWorkspaceById)
  .patch("/workspaces/:id", workspacesController.updateWorkspaceById)
  .delete("/workspaces/:id", workspacesController.deleteWorkspaceById);

module.exports = router;
