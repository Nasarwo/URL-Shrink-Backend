import { model, Schema } from "mongoose";
import shortID from "short-id";

shortID.configure({
  length: 5,
  algorithm: "sha1",
  salt: Math.random(),
});

const UrlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      default: shortID.generate,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export default model("Url", UrlSchema);
