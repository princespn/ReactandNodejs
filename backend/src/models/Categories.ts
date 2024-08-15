import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Category document interface
interface CategoriesDocument extends Document {
  id: string; // or number, depending on what your backend returns
  title: string;
  parent_id:0;
  status:1;
  created_at:Date;
  updated_at:Date;
}

// Define the schema for the Category document
const CategoriesSchema: Schema<CategoriesDocument> = new Schema({
  title: { type: String, required: true },
  parent_id: { type: Number,  default:0},
  status: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }


});

// Create and export the Category model
const Categories: Model<CategoriesDocument> = mongoose.models.Category || mongoose.model<CategoriesDocument>('Category', CategoriesSchema);
export { Categories, CategoriesDocument };
