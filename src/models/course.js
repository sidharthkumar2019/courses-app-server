import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    enrolledCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    discount: {type: Number},
    reviews: [
        {
            review: String
        }
    ],
    author: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: Date
}, {timestamps: true});

export const Course = mongoose.model('Course', courseSchema);