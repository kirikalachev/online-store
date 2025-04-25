import mongoose, {Document, Schema} from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    createdAt: Date;
}

const productSchema = new Schema<IProduct>({
 name: {
    type: String,
    required: true,
    unique: true
 },
 description: {
    type: String,
    required: true,
 },
 price: {
    type: Number,
    required: true,
 }, 
 category: {
    type: String,
    required: true,
 },
 stock: {
    type: Number,
    default: 0,
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
