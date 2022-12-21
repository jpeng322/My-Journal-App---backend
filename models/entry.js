const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema({
    topic: String,
    date: String,
    details: String
}) 

module.exports = mongoose.model("Entry", entrySchema)