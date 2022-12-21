const express = require("express")

const router = express.Router()

const Entry = require("../models/entry")


router.get("/", (req, res) => {
    Entry.find({}).then(entries => res.json(entries))
})

router.get("/:id", (req, res) => {
    id = req.params.id
    console.log(id)
    Entry.findById(id).then(entry => res.json(entry))

})

router.post("/", (req, res) => {
    const entry = new Entry(req.body)

    entry.save().then(entry => {
        if (entry) {
            res.status(200).json(entry)
        } else {
            console.log("no")
            res.status(400).json({ mssg: "empty object" })
        }
    }

    )

})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    Entry.findByIdAndDelete(id).then(result => res.status(200).json({ mssg: "object deleted" }))

})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log({...body})

    Entry.findByIdAndUpdate(id, { ...body }).then(entry => res.status(200).json(entry))
})


module.exports = router