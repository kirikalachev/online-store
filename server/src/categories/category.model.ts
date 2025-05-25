// category.model.ts
import mongoose, {Document, Schema} from 'mongoose';

interface ICategory extends Document {
    name: string;
    createdAt: Date;
}

const categorySchema = new Schema<ICategory>({
 name: {
    type: String,
    required: true,
    unique: true
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
