import express from 'express';
import Category from '../models/Category';
import Business from '../models/Business';
import Booking from '../models/Booking';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses', error: err });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const business = req.body;

  try {
    const categoryExists = await Category.findOne({ name: business.category });
    if (!categoryExists) {
      return res.status(400).json({
        message: 'Failed to add business: specified category does not exist.',
      });
    }

    const newBusiness = new Business(business);

    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (err) {
    res.status(500).json({
      message: 'Server error while adding business.',
      error: (err as Error).message,
    });
  }
});
router.get('/search', async (req, res) => {
  const query = req.query.q;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 40;

  // Проверяем, что query существует и является строкой, а затем убираем пробелы
  if (typeof query !== 'string' || query.trim() === '') {
    return res.json({
      page,
      totalPages: 0,
      totalItems: 0,
      businesses: [],
    });
    //return res.json([]); // Возвращаем пустой массив, если запрос пустой или query не строка
  }

  const searchQuery = query.trim();

  try {
    const totalItems = await Business.countDocuments({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { about: { $regex: searchQuery, $options: 'i' } },
        { address: { $regex: searchQuery, $options: 'i' } },
        { available: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { contactPerson: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    });

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(totalItems / limit);
    const businesses = await Business.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { about: { $regex: searchQuery, $options: 'i' } },
        { address: { $regex: searchQuery, $options: 'i' } },
        { available: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { contactPerson: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    })
      .skip((page - 1) * limit) // Пропускаем записи для предыдущих страниц
      .limit(limit);
    res.json({
      page,
      totalPages,
      totalItems,
      businesses,
    });
    // res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).send('Server error');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send('Business not found');
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching business', error: err });
  }
});
router.get('/details/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send('Business not found');
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching business by id', error: err });
  }
});
router.get('/category/:category', async (req, res) => {
  try {
    const filteredBusinesses = await Business.find({
      category: req.params.category.toLowerCase(),
    });
    res.json(filteredBusinesses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses by category', error: err });
  }
});

router.get('/:id/bookings/date/:date', async (req, res) => {
  try {
    const slots = await Booking.find({
      businessId: req.params.id,
      date: new Date(req.params.date),
    });
    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching bookings for the specified date and business',
      error: err,
    });
  }
});

export default router;
