const mongoose = require('mongoose')

// Define the schema for the 'Goal' collection in MongoDB
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the '_id' of the user associated with the goal
        required: true, 
        ref: 'User' // name of the model
    },
    text:{
     type: String,
    required: [true, 'Please add a text value']
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Goal', goalSchema)
