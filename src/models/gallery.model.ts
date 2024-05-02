import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema: Schema = new Schema(
  {
    image: {
      type: String,
      default:
        "https://a0.muscache.com/im/pictures/miso/Hosting-927979217851382039/original/c11b4dc5-776a-4503-b691-d62ab66dee79.jpeg?im_w=720",
    },
  },
  { timestamps: true }
);

const Gallery =
  (mongoose.models?.galleries as mongoose.Model<IGallery>) ||
  mongoose.model<IGallery>("galleries", GallerySchema);
export default Gallery;
