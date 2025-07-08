const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/Association')
const authenticate = require('../middleware/JWT')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.signUp = async (req, res) => {
    try {
        const {username, phone, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({username, phone, email, password: hashedPassword})
        res.status(201).json({message: 'sign up successful', user: newUser})
    } catch (error) {
        res.status(500).json({error: 'sign up failed', details: error.message})
    }
}

exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error: 'Wrong email or password'})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "3h"})
        res.status(200).json({message: `Login successful token=${token}`, token})
    } catch (error) {
        res.status(500).json({error: "Login failed", details: error.message});
    }
}

exports.getUserInfo = [authenticate, async(req, res) => {
    try {
        const user = req.user
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({message: "Find user successfully", user: user.toJSON()})
    } catch (error) {
        res.status(500).json({error: "User not found", details: error.message})
    }
}]

exports.updateProfileInfo = [authenticate, async (req, res) => {
    try {
        const {username, email, phone, address} = req.body
        const user = req.user

        if (!user) {
            return res.status(404).json({ message: "User not found" });
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

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.creditCards = creditCards
        await user.save();

        res.status(200).json({message: `Data changed to Credit Crads: ${user.creditCards}`})
    } catch (error) {
        res.status(500).json({error: "Update failed", details: error.message})
    }
}]

// 建立儲存目錄（第一次啟動時會自動建立）
const uploadDir = path.join(__dirname, "..", "public", "uploads", "avatars");
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
} 

// 設定 multer 儲存設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

exports.updateAvatarUrl = [authenticate, 
    upload.single("avatar"), 
    async (req, res) => {
    try {
        const user = req.user
        if(!req.file) return res.status(400).json({message: "No file uploaded"})

        const avatarUrl = `/uploads/avatars/${req.file.filename}`
        user.avatarUrl = avatarUrl
        await user.save();

        res.status(200).json({message: `Avatar updated`, avatarUrl})
    } catch (error) {
        res.status(500).json({error: "Update failed", details: error.message})
    }
}]