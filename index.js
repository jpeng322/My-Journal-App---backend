require("dotenv").config()

const express = require("express")
const app = express()
app.use(express.json())

const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI).then(
    console.log("connected to mongo")
)

const journals = [
    {
        topic: "Today is work day",
        date: "December 43, 2223",
        details: "asdsadasdasdsad",
        id: 1
    },
    {
        topic: "BLAHBLAHBLAHDAY",
        date: "January 12, 2123",
        details: "asdsadasdasdsad",
        id: 2
    },
    {
        topic: "my bday",
        date: "March 22, 1999",
        details: "Its my bday today ya",
        id: 3
    }
]

app.listen(process.env.PORT, (req, res) => {
    // res.end("asdadsadasd")
    console.log(`Server running on port`)
})


app.get("/entries", (req, res) => {
    res.json(journals)
})

app.get("/", (req, res) => {

})

app.post("/entries", (req, res) => {
    console.log("posted")
    const body = req.body
    console.log("error")

    const { topic, date, details } = body

    newEntry = {
        topic,
        date,
        details
    }

    if (Object.keys(body).length > 0) {
        res.status(200).json([newEntry, ...journals])
    } else {
        console.log("no")
        res.status(400).json({ mssg: "empty object" })
    }


    // res.status(200).json([newEntry, ...journals])
    // .catch(error => {
    //     console.log(error)
    // })
})

app.delete("", (req, res) => {

})