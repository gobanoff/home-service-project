import express from 'express';
import Category from '../models/Category';
import Business from '../models/Business';
import Booking from '../models/Booking';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.pageas as string, 10) || 1;
    const limit = parseInt(req.query.limitas as string, 10) || 0;
    const skip = (page - 1) * limit;

    const business = await Business.find().skip(skip).limit(limit);
    const total = await Business.countDocuments();

    res.json({
      business,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 0;
    const page = parseInt(req.query.page as string, 10) || 1;

    const skip = (page - 1) * limit;

    const businesses = await Business.find().limit(limit).skip(skip);
    const totalBusinesses = await Business.countDocuments();

    res.json({
      businesses,
      totalBusinesses,
      totalPages: Math.ceil(totalBusinesses / limit),
      currentPage: page,
    });
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

  if (typeof query !== 'string' || query.trim() === '') {
    return res.json({
      page,
      totalPages: 0,
      totalItems: 0,
      businesses: [],
    });
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
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({
      page,
      totalPages,
      totalItems,
      businesses,
    });
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
  const { category } = req.params;

  const pageNumber = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.limit as string, 10) || 1;
  try {
    const totalBusinesses = await Business.countDocuments({
      category: category.toLowerCase(),
    });

    const filteredBusinesses = await Business.find({
      category: category.toLowerCase(),
    })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      total: totalBusinesses,
      page: pageNumber,
      limit: pageSize,
      businesses: filteredBusinesses,
      category,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses by category', error: err });
  }
});

router.get('/sidelist/:category', async (req, res) => {
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
router.post('/:id/rating', async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    business.rating += 1;

    await business.save();

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({
      message: 'Error voting for business',
      error: (err as Error)?.message ?? err,
    });
  }
});

export default router;
