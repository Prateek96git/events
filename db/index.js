const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true}, (err) => {
        if(err)
        return err.message;

        console.log('mongodb connected successfully')
    })
}

module.exports = connectDB