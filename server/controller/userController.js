const User = require("../model/userModel")
const bcrypt = require("bcrypt")

// REGISTER CONTROLLER
const registerController = async(req, res, next) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;
        const usernameCheck = await User.findOne({
            username
        })
        if (usernameCheck) {
            return res.json({
                msg: "Username is already Used",
                status: false
            });
        }
        const emailCheck = await User.findOne({
            email
        })
        if (emailCheck)
            return res.json({
                msg: "Email is already Used",
                status: false
            });
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password: hashPassword
        })

        delete user.password;
        return res.json({ status: true, user })

    } catch (error) {
        next(error)
    }
}

// LOGIN CONTROLLER
const loginController = async(req, res, next) => {

    try {
        const {
            username,
            password,
        } = req.body;
        const user = await User.findOne({
            username
        })
        if (!user) {
            return res.json({
                msg: "Incorrect username",
                status: false
            });
        }
        const ispasswordValid = await bcrypt.compare(password, user.password)
        if (!ispasswordValid) {
            return res.json({
                msg: "Incorrect password",
                status: false
            });
        }
        delete user.password

        return res.json({
            status: true,
            user
        })

    } catch (error) {

        next(error)

    }
}


// LOGOUT  WITHOUT COMING BACK TO THE PREVIOUS REGISTER OR SIGN IN PAGE WHEN SUCCESSFULLY LOGIN
// const logoutController = async(req, res) => {
//     try {
//         req.session.destroy()
//         res.redirect("/login")
//     } catch (error) {
//         console.log(error.message)
//     }

// }

module.exports = {
    loginController,
    registerController,
    // logoutController


}