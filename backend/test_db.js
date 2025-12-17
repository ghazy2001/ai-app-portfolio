const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Mask URI for log safety if needed, but logging it helps debug. 
// I'll log just the host.
console.log("URI Loaded:", !!process.env.MONGO_URI);

const connect = async () => {
    console.log("Attempting connection...");
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("Connected!");
        process.exit(0);
    } catch (e) {
        console.error("Connection failed:", e.message);
        process.exit(1);
    }
};
connect();
