const {
  clientList,
  clientCreate,
  clientEdit,
  clientDelete,
  clientView,
} = require("../controllers/client.controller");
const { authenticateToken } = require("../middleware/auth");

const clientRouter = require("express").Router();

clientRouter.get("/list", authenticateToken, clientList);
clientRouter.get("/view/:id", authenticateToken, clientView);
clientRouter.post("/create", authenticateToken, clientCreate);
clientRouter.put("/:id", authenticateToken, clientEdit);
clientRouter.delete("/", authenticateToken, clientDelete);

module.exports = clientRouter;
