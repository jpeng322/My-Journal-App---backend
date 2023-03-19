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
    console.log(username, password)
    const hashPass = await bcrypt.hash(password, 10)
    // console.log(hashPass)
    const user = new User({ username, password: hashPass })

    if (username === "" || password === "") {
        res.status(400).json({
            msg: "Invalid username or password."
        })
        return
    }

    if (!validator.isEmail(username)) {
        res.status(400).json({ msg: "Username is not an email." })
        return
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        res.status(400).json({ msg: "Password is not strong enough. Make sure your password has at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol!" })
        return
    }


    User.findOne({ username }).then(username => {
        if (username) {
            res.status(400).json({
                msg: "Username already exists."
            })
            return
        } else {
            user.save().then(user => {
                console.log(user._id)
                const token = createToken(user._id)
                console.log(token)
                res.status(200).json(
                    {
                        msg: "User successfully signed up!",
                        user,
                        token
                    }
                )
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

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    // console.log(req)
    try {
        if (!username || !password) {
            // res.json({ mssg: "Invalid username or password" })
            throw Error("No username or password filled.")
        }

        const user = await User.findOne({ username })
        if (!user) {
            throw Error('User does not exist.')
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error('Incorrect email or password.')
        }

        bcrypt.compare(password, user.password).then(matched => {
            const token = createToken(user._id)
            res.status(200).json({ user, token, mssg: "Logged in." })

        })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//     bcrypt.compare(password, user.password).then(matched => {
//         console.log("returning")
//         const token = createToken(user._id)
//         res.status(200).json({ user, token, mssg: "logged in" })

//     })
// })

module.exports = router


