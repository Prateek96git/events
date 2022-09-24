const User = require('../model/userModel')

const authAdmin = async (req, res, next) => {
    try {
       const user = await User.findById({_id: req.user.id})

       if (user.role !== "superadmin")
            return res.status(400).json({ msg: "Access denied for Users.."});

            next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin;