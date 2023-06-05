import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
    {
        name: String,
        price: Number,
        image: String,
        description: String,
    },
    {timestamps:true,versionKey:false}
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema)
   