import mongoose from 'mongoose';

interface IBusiness {
  name: string;
  about: string;
  address: string;
  available: string;
  category: string;
  rating: number;
  contactPerson: string;
  email: string;
  imageUrls: string[];
}

const businessSchema = new mongoose.Schema<IBusiness>({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Invalid email format',
    },
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
});

const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;
