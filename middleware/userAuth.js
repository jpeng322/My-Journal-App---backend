const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = (req, res, next) => {

    const { authorization } = req.headers
    console.log(req.body)

    if (!authorization) {
        return res.status(401).json({ error: "No authorization token" })
    }

    const token = authorization.split(" ")[1]
    // console.log(jwt.verify(token, process.env.SECRET))


    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        // console.log(id)
        // User.findOne({ id }).select("id")
        //     .then(result => {
        //         console.log(result, "RESULTTTTTTTTT")
        //         req.user = result.id
        //         console.log(req.user, "REQUSER")
        //         next()
        //     })
        User.findOne({"_id" : id}).select("_id")
        .then(result => {
            req.user = result.id
            next()
        })
    } catch {
        console.log("catch")
        res.status(401).json({ mssg: "Request is not authorized" })
    }
    }

    // if (jwt.verify(token, process.env.SECRET)) {
    //     console.log("break2")
    //     const { _id } = jwt.verify(token, process.env.SECRET)
    //     User.findOne({ _id }).select("_id")
    //         .then(result => {
    //             console.log(result, "THIS IS THE RESULT")
    //             next()
    //         })
    // } else {
    //     res.status(401).json({ mssg: "Request is not authorized" })
    // }



    // jwt.verify(token, process.env.SECRET).then(user => {
    //     const _id = user.id
    //     User.findOne({ _id }).select("_id")
    // })
    //     .then(result => {
    //         console.log(result, "THIS IS THE RESULT")
    //         next()
    //     }).catch(error => {
    //         console.log("errorcaught")
    //         res.status(401).json({ mssg: "Request is not authorized" })
    //     })
    //     .catch (error => {
    // console.log("errorcaught")
    // res.status(401).json({ mssg: "Request is not authorized" })


module.exports = userAuth