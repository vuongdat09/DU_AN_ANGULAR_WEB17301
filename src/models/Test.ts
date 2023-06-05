import mongoose from "mongoose";

const categoryShema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    img: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    nghia: String,
    dat: Number,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categoryShema);
