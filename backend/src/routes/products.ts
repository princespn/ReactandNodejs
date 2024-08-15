import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT } from '../middleware/authMiddleware'; // Ensure this middleware exists and is correctly implemented
import { Products } from '../models/Products'; // Adjust the path if necessary
import { Categories } from '../models/Categories';

const router = express.Router();
// Route to get products
router.get('/getproducts', authenticateJWT, async (req: Request, res: Response) => {
  try {
      const products = await Products.find();
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Products.' });
  }
});


router.get('/show/:id',authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Products.find({ title: req.params.id });
    res.json({ id: req.params.id, products });
  } catch (err) {
    next(err);
  }
});

// Add a new Products
router.post('/add', authenticateJWT, [
  body('name').notEmpty().withMessage('Name field is required'),
  body('prod_sku').notEmpty().withMessage('Product sku field is required'),
  body('description').notEmpty().withMessage('Product description field is required'),
  body('selling_price').notEmpty().withMessage('Product selling price field is required'),
  body('stock_qty').notEmpty().withMessage('Product stock qty field is required'),
  body('categories').notEmpty().withMessage('Category field is required')
 // body('prod_sku').notEmpty().withMessage('Product sku field is required'),
 // body('prod_sku').notEmpty().withMessage('Product sku field is required'),

], async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const thumbimage = req.file ? req.file.filename : 'noimage.png';
  const { name,prod_sku,description,selling_price,stock_qty,categories} = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Validate that the category exists
    const categoryExists = await Categories.findById(categories);
    if (!categoryExists) {
      return res.status(400).json({ message: `Category with id ${categories} not found` });
    }

    const products = new Products({ name,prod_sku,description, categories, selling_price,stock_qty, thumbimage});
    await products.save();
    res.status(201).json({ message: 'Products has been created.' });
  } catch (err) {
    next(err);
  }
});




export default router;
