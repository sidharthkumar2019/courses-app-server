import {Course} from '../models/course';
import { Request, Response } from 'express';

export const addCourse = async (req: Request, res: Response) => {
    try {
        const {
            name, price, description, author, enrolledCount
        } = req.body;
    
        let newCourse = new Course({
            name,
            price,
            description,
            author,
            enrolledCount,
        });
        newCourse = await newCourse.save();
        
        return res.status(201).send({
            success: true,
            course: [newCourse],
            message: 'Course successfully added.'
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                success: false,
                course: [],
                message: error.message
            });
        }
        return res.status(400).send({
            success: false,
            course: [],
            message: "Unknown Error"
        });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { courseID } = req.params;
    
        if (courseID) {
            let course = await Course.findOne({ _id: courseID });
            
            if (course) {
                return res.status(200).send({
                    success: true,
                    course: [course],
                    message: 'Course successfully fetched.'
                });
            }
            else {
                return res.status(404).send({
                    success: false,
                    course: [],
                    message: 'No such course found.'
                });
            }
        }
        else {
            return res.status(400).send({
                success: false,
                course: [],
                message: 'Params required'
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                success: false,
                course: [],
                message: error.message
            });
        }
        return res.status(500).send({
            success: false,
            course: [],
            message: "Unknown Error"
        });
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseID } = req.params;
        if (courseID) {
            let deletedCourse = await Course.findOneAndDelete({ _id: courseID });
            if (deletedCourse) {
                return res.status(202).send({
                    success: true,
                    course: [deletedCourse],
                    message: 'Course successfully deleted.'
                });
            }
            else {
                return res.status(404).send({
                    success: false,
                    course: [],
                    message: 'No such course found.'
                });
            }
        }
        else {
            return res.status(400).send({
                success: false,
                course: [],
                message: "Params required"
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                success: false,
                course: [],
                message: error.message
            });
        }
        return res.status(500).send({
            success: false,
            course: [],
            message: "Unknown Error"
        });
    }
}

export const allCourses = async (req: Request, res: Response) => {
    try {
        let courses = await Course.find({});
        if (courses) {
            return res.status(200).send({
                success: true,
                course: [courses],
                message: 'Courses successfully fetched.'
            });
        }
        else {
            return res.status(400).send({
                success: false,
                course: [],
                message: 'courses couldn\'t be obtained.'
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                success: false,
                course: [],
                message: error.message
            });
        }
        return res.status(400).send({
            success: false,
            course: [],
            message:"Unknown Error"
        });
    }
}

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { courseID } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(courseID, req.body, {
            new: true, // return the updated document
            runValidators: true, // run schema validators
        });
        if (updatedCourse) {
            return res.status(200).send({
                success: true,
                course: [updatedCourse],
                message: 'Course successfully updated.'
            });
        }
        else {
            return res.status(404).send({
                success: false,
                course: [],
                message: 'Course not found'
        });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                success: false,
                course: [],
                message:  error.message
            });
        }
        return res.status(400).json({
            success: false,
            course: [],
            message: "Unknown Error"
        });
    }
};