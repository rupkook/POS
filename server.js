const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const demoRoutes = require("./routes/demoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use("/api/contact", contactRoutes);
app.use("/api/demo", demoRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
