import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateJWT } from '../middleware/authMiddleware'; // Ensure this middleware exists and is correctly implemented
import { Categories } from '../models/Categories'; // Adjust the path if necessary
import multer from 'multer';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/book/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



// Route to get users
router.get('/getcategorys', authenticateJWT, async (req: Request, res: Response) => {
  try {
      const userdata = await Categories.find();
      res.json(userdata);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Categories.' });
  }
});


// Get categories by title (assuming title is used as the category name)
router.get('/show/:category',authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Categories.find({ title: req.params.category });
    res.json({ title: req.params.category, categories });
  } catch (err) {
    next(err);
  }
});

// Add a new category
router.post('/add', authenticateJWT, [
  body('title').notEmpty().withMessage('Title field is required'),
  body('status').notEmpty().withMessage('Status field is required')

], async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { title,status } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const category = new Categories({ title, status });
    await category.save();
    res.status(201).json({ message: 'Category has been created.' });
  } catch (err) {
    next(err);
  }
});



// Edit an existing post
router.put('/edit/:id', authenticateJWT, upload.single('thumbimage'), [
  body('title').notEmpty().withMessage('Title field is required'),
  body('status').notEmpty().withMessage('Status field is required')
  //body('id').notEmpty().withMessage('Id field is required')
 
], async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { title, status } = req.body;
  const thumbimage = req.file ? req.file.filename : req.body.prevImage;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params; // Extracting `id` from request parameters
    const categoryExists = await Categories.findById(id);
    if (!categoryExists) {
      return res.status(400).json({ message: `Category with id ${id} not found` });
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { title, status, thumbimage },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).send('Category not found');
    res.status(200).json({ message: 'Category updated', updatedCategory });
  } catch (err) {
    next(err);
  }
});

// Delete a Categories
router.delete('/delete/:id', authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCategories = await Categories.findByIdAndDelete(req.params.id);
    if (!deletedCategories) return res.status(404).send('Categories not found');
    res.status(200).json({ message: 'Categories deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
