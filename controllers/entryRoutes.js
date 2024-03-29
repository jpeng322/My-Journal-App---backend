const express = require("express")

const router = express.Router()

const Entry = require("../models/entry")

const userAuth = require("../middleware/userAuth")

router.use(userAuth)

router.get("/", (req, res) => {
    // console.log(req.body)
    // console.log(req.user_id, "asdasdasdasdasdasdasd")
    const user_id = req.user_id
    Entry.find({"user_id": req.user}).then(entries => { 
        console.log(entries)
        res.json(entries) })
})

router.get("/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    Entry.findById(id).then(entry => res.json(entry))

})

router.post("/", (req, res) => {
    console.log(req.user, "REQ USER ROUTER POST")
    const entry = new Entry({ ...req.body, "user_id": req.user })
    console.log(entry, "POST REUQST")
    entry.save().then(entry => {
        if (entry) {
            res.status(200).json(entry)
        } else {
            res.status(400).json({ mssg: "empty object" })
        }
    }

    )

})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    console.log
    Entry.findByIdAndDelete(id).then(result => res.status(200).json({ mssg: "object deleted" }))

})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log({ ...body })

    Entry.findByIdAndUpdate(id, { ...body }).then(entry => res.status(200).json(body)).catch(err => console.log(err))
})


module.exports = router