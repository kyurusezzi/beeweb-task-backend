require("dotenv").config();
const cors = require("cors");

const express = require("express");
const routes = require("./routes/routes");
const { sequelize } = require("./configs/db.config");
const { initialize: authInitialize } = require("./middlewares/auth.middleware");

(async () => {
  // await sequelize.sync({ force: true });
})();

const app = express();

app.use(cors());
app.use(authInitialize);

app.use(express.json());

app.use(routes.authRoutes);
app.use(routes.workspacesRoutes);
app.use(routes.subdomainsRoutes);
app.use(routes.userRoutes);
app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "!")
);
