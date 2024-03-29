const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbUrl = process.env.INTUIT_APP_MONGO_URL;
        console.log(dbUrl)
        if (!dbUrl) {
            throw new Error('MONGO_URL environment variable is not set.');
        }

        const conn = await mongoose.connect(dbUrl);

        console.log(`Database connected to host: ${conn}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
