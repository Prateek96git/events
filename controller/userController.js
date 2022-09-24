const User = require('../model/userModel')

const userController = {
    getAllUser: async (req,res) => {
        try {
            let users = await User.find().select('-password');
            let nonAdminData = users.filter((item) => item.role === "user");
            res.status(200).json({ users:nonAdminData })
        } catch (err) {
            return res.status(500).json({ msg: err.message});
        }
    },
    getSingleUser: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.params.id});
            res.json({ user})
        } catch (err) {
            return res.status(500).json({ msg: err.message});
        }
    },
    getCurrentUser: async (req, res) => {
        try {
           let id = req.user.id;

           let user = await User.findById({_id: id}) 

           res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message});
        }
    },
}

module.exports = userController