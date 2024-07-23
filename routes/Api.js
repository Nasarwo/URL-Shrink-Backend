import { Router } from "express";
import urlModel from "../models/Url.js";

const router = Router();

router.post("/shrink", async (req, res) => {
  if (!req.body.link) {
    res.status(400).json({
      status: "link required",
    });
  } else {
    const CheckUrl = await urlModel.findOne({
      url: req.body.link,
    });

    if (CheckUrl) {
      const urlObj = CheckUrl.toObject();
      res.json({
        short_url: urlObj.short_url,
      });
    } else {
      const shortUrl = await urlModel.create({
        url: req.body.link,
      });
      const urlObj = shortUrl.toObject();
      res.json({
        short_url: urlObj.short_url,
      });
    }
  }
});

export default router;
