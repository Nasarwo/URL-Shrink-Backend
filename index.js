import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import apiRouter from "./routes/Api.js";
import urlModel from "./models/Url.js";

const app = express();

//Middlewares
dotenv.config();
app.use(express.json());

//Constants (ENV)
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

//Endpoints
app.use("/api", apiRouter);
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await urlModel.findOne({
    short_url: req.params.shortUrl,
  });
  if (shortUrl) {
    shortUrl.clicks++;
    shortUrl.save();
    const shortCode = shortUrl.toObject();
    res.redirect(`${shortCode.url}`);
  }
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@urlshrinkcluster.oakkfg3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=UrlShrinkCluster`
    );

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
