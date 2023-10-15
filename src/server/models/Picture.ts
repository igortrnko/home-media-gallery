import mongoose from "mongoose";
import { BasicMongooseType } from "./Model.types";

export interface PictureType {
  name: string;
  source: string;
  blurDataURL?: string;
}

export interface PictureDT extends BasicMongooseType, PictureType {}

interface Picture extends PictureType, mongoose.Document {}

const PictureSchema = new mongoose.Schema<Picture>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    source: {
      type: String,
      required: [true, "Please provide a source"],
    },
    blurDataURL: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Picture ||
  mongoose.model<Picture>("Picture", PictureSchema);
