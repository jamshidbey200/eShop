const mongoose = require('mongoose')
const url = `mongodb+srv://jamshidbek536:eShop123@cluster0.nmozasj.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (err) {
        console.log("DB xato:", err);
    }

    
}

module.exports = connectDB;
