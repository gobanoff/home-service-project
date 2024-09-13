import express from 'express';
import Category from '../models/Category';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({
      message: 'Error creating booking',
      error: (err as Error)?.message ?? err,
    });
  }
});

router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.rating += 1;

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: 'Error voting for category',
      error: (err as Error)?.message ?? err,
    });
  }
});
export default router;
