const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://anshuanand0022:1234@cluster0.ci75gzd.mongodb.net/");
        console.log("MongoDB connected...");
    } catch (err) {
        console.error(err.message);
        console.log("not connected");
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
