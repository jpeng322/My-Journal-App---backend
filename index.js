require("dotenv").config()

const express = require("express")
const app = express()
app.use(express.json())

const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI).then(
    console.log("connected to mongo")
)

const router = require("./controllers/routes")

app.use("/entries", router)

const journals = [
    {
        "topic": "Today is work day",
        "date": "December 43, 2223",
        "details": "asdsadasdasdsad",
        "id": 1
    },
    {
        "topic": "BLAHBLAHBLAHDAY",
        "date": "January 12, 2123",
        "details": "asdsadasdasdsad",
        "id": 2
    },
    {
        "topic": "my bday",
        "date": "March 22, 1999",
        "details": "Its my bday today ya",
        "id": 3
    }
]

app.listen(process.env.PORT, (req, res) => {
    // res.end("asdadsadasd")
    console.log(`Server running on port`)
})


// app.get("/entries", (req, res) => {
//     Entry.find({}).then(entries => res.json(entries))
// })

// app.get("/entries/:id", (req, res) => {
//     id = req.params.id
//     console.log(id)
//     Entry.findById(id).then(entry => res.json(entry))

// })

// app.post("/entries", (req, res) => {
//     const entry = new Entry(req.body)

//     const { topic, date, details } = entr

//     entry.save().then(entry => {
//         if (entry) {
//             res.status(200).json(entry)
//         } else {
//             console.log("no")
//             res.status(400).json({ mssg: "empty object" })
//         }
//     }

//     )

// })

// app.delete("/entries/:id", (req, res) => {
//     const id = req.params.id

//     Entry.findByIdAndDelete(id).then(result => res.status(200).json({ mssg: "object deleted" }))

// })

// app.put("/entries/:id", (req, res) => {
//     const id = req.params.id
//     const body = req.body
//     console.log({...body})

//     Entry.findByIdAndUpdate(id, { ...body }).then(entry => res.status(200).json(entry))
// })
