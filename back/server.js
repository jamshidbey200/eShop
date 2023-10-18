const app = require('./app');
const connectDB = require('./db/Database');
require('dotenv').config()

process.on('uncaughtException', (err) => {
    console.log(`Error, Xato: ${err.message}`);
    console.log(`server uzuldi`);
})

const port = process.env.NODE_ENV || 3300;

const server = app.listen(port, () => {
    console.log("Server listening on 3300")
})

connectDB();

process.on("unhandledRejection", (err) => {
    console.log(`Server tashlavordi: ${err.message}`);
    console.log("Server pishdi lekin");
    
    server.close(() => {
        process.exit(1);
    });
})