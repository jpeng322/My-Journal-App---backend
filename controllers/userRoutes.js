const express = require("express")

const router = express.Router()

const User = require("../models/user")

const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

router.get("/signup", (req, res) => {
    res.json({ msg: "signup" })
})

// router.post("/signup", (req, res) => {
//     res.json({ msg: "signup" })
// })

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" })

    return token
}

router.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    console.log(hashPass)
    const user = new User({ username, password: hashPass })

    if (username === "" || password === "") {
        res.status(400).json({ msg: "Invalid username or password." })
        return
    }

    if (!validator.isEmail(username)) {
        res.status(400).json({ msg: "Username is not an email" })
        return
    }

    if (!validator.isStrongPassword(password)) {
        res.status(400).json({ msg: "Password is not strong enough" })
        return
    }


    User.findOne({ username }).then(username => {
        if (username) {
            res.status(400).json({ mssg: "username exists" })
            return
        } else {
            user.save().then(user => {
                console.log(user._id)
                const token = createToken(user._id)
                console.log(token)
                res.status(200).json({ user, token })
            }).catch
                (
                    error => res.status(400).json({ error: error.message })
                )

        }
    }
    )
    // if (existUsername) {
    //     res.status(400).json({ mssg: "username exists" })
    //     return
    // }


    // user.save().then(user => {
    //     res.status(200).json(user)
    // }).catch
    //     (
    //         error => res.status(400).json({ error: error.message })
    //     )

})

router.post("/login", (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.json({ mssg: "Invalid username or password" })
    }

    User.findOne({ username }).then(user => {
        console.log(user)

        if (!user) {
            res.json({ mssg: "Incorrect email" })
            return
        }
        // bcrypt.compare(password, user.password).then(matched => console.log(matched === false))

        bcrypt.compare(password, user.password).then(matched => {
            if (matched === true) {
                const token = createToken(user._id)
                res.json({ user, token, mssg: "logged in" })
            } else {
                res.json({ mssg: "Incorrect password" })
            }
        })
    })

})

module.exports = router


