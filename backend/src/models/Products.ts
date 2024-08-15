import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for a single comment
interface Comment {
    title: string;
    desc: string;
    rating:0;    
    date: Date;
  }
  

  
interface ProductsDocument extends Document {
  name: string;
  prod_sku: string;
  description: string;
  selling_price: 0;
  stock_qty:0;
  categories: mongoose.Schema.Types.ObjectId;  // Changed to a single category
  created_at: Date;
  updated_at: Date;
  thumbimage: string;
  comments: Comment[];
}

// Define the schema for the Post document
const ProductsSchema: Schema<ProductsDocument> = new Schema({
    name: { type: String, required: true },
    prod_sku: { type: String, required: true },
    description: { type: String, required: true },
    stock_qty: { type: Number, required: true },
    selling_price: { type: Number, required: true },
  categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },  // Changed to a single category
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  thumbimage: { type: String, default: 'noimage.png' },
  comments: [{
    title: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }]
});

// Create and export the Products model
const Products: Model<ProductsDocument> = mongoose.models.Products || mongoose.model<ProductsDocument>('Products', ProductsSchema);
export { Products, ProductsDocument };