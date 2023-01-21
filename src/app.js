require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const { sequelize } = require("./configs/db.config");
const { initialize } = require("./middlewares/auth.middleware");

(async () => {
  // await sequelize.sync({ force: true });
})();

const app = express();

app.use(initialize);
app.use(express.json());
app.use(routes.authRoutes);
app.use(routes.workspacesRoutes);
app.use(routes.subdomainsRoutes);
app.use(routes.userRoutes);
app.listen(3000, () => console.log("Server started on port 3000!"));
