const { register, login, registerController, loginController, logoutController } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", registerController)
router.post("/login", loginController)
    // router.get("/login", logoutController)

module.exports = router