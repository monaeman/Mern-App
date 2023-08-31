const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //_id
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
