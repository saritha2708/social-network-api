const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
    console.log('getAllUsers');
    try {
        const userData = await User.find().populate('thoughts').populate('friends');
        console.log('userData', userData);
        res.status(200).json(userData);
    } catch (err) {
        console.log('err', err);
        res.status(400).json(err);
    }
};        

const getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        await Thought.deleteMany({ username: user.username });
        res.status(200).json({ message: 'User and the associated thoughts are deleted!' });
    } catch (err) {
        res.status(400).json(err);
    }
};

const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const deleteFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json({ message: 'Friend is deleted!' });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
};
