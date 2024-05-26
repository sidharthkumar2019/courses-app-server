import mongoose, {Schema, Document} from 'mongoose';

// Define the interface for the Course document
interface ICourse extends Document {
    name: string;
    price: number;
    enrolledCount: number;
    description: string;
    discount?: number;
    reviews: { review: string }[];
    author: string;
    updatedAt?: Date;
}

// Create the Course schema
const courseSchema: Schema<ICourse> = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
      },
      enrolledCount: {
        type: Number,
        default: 0,
        min: 0,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      discount: {
        type: Number,
      },
      reviews: [
        {
          review: {
            type: String,
          },
        },
      ],
      author: {
        type: String,
        required: true,
        trim: true,
      },
      updatedAt: {
        type: Date,
      },
    },
    { timestamps: true }
);

// Create the Course model
export const Course = mongoose.model<ICourse>('Course', courseSchema);