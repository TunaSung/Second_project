const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/Association')
const authenticate = require('../middleware/JWT')

exports.register = async (req, res) => {
    try {
        const {username, phone, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({username, phone, email, password: hashedPassword})
        res.status(201).json({message: 'sign up successful', user: newUser})
    } catch (error) {
        res.status(500).json({error: 'sign up failed', details: error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error: 'Wrong email or password'})
        }

        const token = jwt.sign({userId: user.id}, "mysecret", {expiresIn: "3h"})
        res.status(200).json({message: `Login successful token=${token}`, token})
    } catch (error) {
        res.status(500).json({error: "Login failed", details: error.message});
    }
}

exports.updateProfileInfo = [authenticate, async (req, res) => {
    try {
        const {username, email, phone, address} = req.body
        const user = req.user
        // const userId = req.user?.id || 1
        // const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: "Can't find user" });
        }

        user.username = username
        user.email = email
        user.phone = phone
        user.address = address
        await user.save();

        res.status(200).json({message: `Data changed to name: ${user.username}, email: ${user.email}, phone number: ${user.phone}, address: ${user.address}`})
    } catch (error) {
        res.status(500).json({error: "Update failed", details: error.message})
    }
}]

exports.updateCreditCard = [authenticate, async (req, res) => {
    try {
        const {creditCards} = req.body
        const user = req.user
        // const userId = req.user?.id || 1
        // const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: "Can't find user" });
        }

        user.creditCards = creditCards
        await user.save();

        res.status(200).json({message: `Data changed to Credit Crads: ${user.creditCards}`})
    } catch (error) {
        res.status(500).json({error: "Update failed", details: error.message})
    }
}]

exports.updateAvatarUrl = [authenticate, async (req, res) => {
    try {
        const {avatarUrl} = req.body
        const user = req.user
        // const userId = req.user?.id || 1
        // const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: "Can't find user" });
        }

        user.avatarUrl = avatarUrl
        await user.save();

        res.status(200).json({message: `Data changed to Avatar URL: ${user.avatarUrl}`})
    } catch (error) {
        res.status(500).json({error: "Update failed", details: error.message})
    }
}]