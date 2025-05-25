import mongoose, {Document, Schema} from 'mongoose';

interface IProduct extends Document {
   //  id: string;
    name: string;
    description: string;
    price: number;
    category: mongoose.Types.ObjectId;
    createdAt: Date;
}

const productSchema = new Schema<IProduct>({
 name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
 },
 description: {
    type: String,
    required: true,
    trim: true,
 },
 price: {
    type: Number,
    required: true,
    min: 0,
 }, 
 category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
