const {
  managerList,
  managerCreate,
  managerView,
  managerEdit,
  managerDelete,
} = require("../controllers/manager.controller");
const { authenticateToken } = require("../middleware/auth");

const managerRouter = require("express").Router();

managerRouter.get("/list", authenticateToken, managerList);
managerRouter.get("/view/:id", authenticateToken, managerView);
managerRouter.post("/create", authenticateToken, managerCreate);
managerRouter.put("/:id", authenticateToken, managerEdit);
managerRouter.delete("/", authenticateToken, managerDelete);

module.exports = managerRouter;
