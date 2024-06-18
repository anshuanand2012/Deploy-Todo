const express = require("express");
const connectDb = require("./conn/conn");
const auth=require("./routes/auth");
const list=require("./routes/list");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors());
// routes

app.use("/api/v1", auth);
app.use("/api/v2", list);
app.get("/", (req, res) => {
    res.send("hello");
});

const port = process.env.PORT || 1000;

// Connect to database
connectDb();

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
