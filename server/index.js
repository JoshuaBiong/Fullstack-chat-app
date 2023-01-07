const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js")



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)

mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("CONNECTED SUCCESSFULLY TO DB")
}).catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`CENNECTED TO ${process.env.PORT}`)
});