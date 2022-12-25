const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema({
    topic: String,
    date: String,
    details: String,
    favorite: Boolean
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Entry", entrySchema)