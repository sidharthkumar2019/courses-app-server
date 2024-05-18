import {Course} from '../models/course.js';

export const addCourse = async (req, res) => {
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
        
        return res.status(201).send(newCourse);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseID } = req.params;
    
        if (courseID) {
            let course = await Course.findOne({ _id: courseID });
            
            if (course) {
                return res.status(200).json({ course });
            }
            else {
                return res.status(404).json({ message: 'No such course found.' });
            }
        }
        else {
            return res.status(400).json({ error: "Params required" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseID } = req.params;
        if (courseID) {
            let deletedCourse = await Course.findOneAndDelete({ _id: courseID });
            if (deletedCourse) {
                return res.status(202).json({ course: deletedCourse });
            }
            else {
                return res.status(404).json({ message: 'No such course found.' });
            }
        }
        else {
            return res.status(400).json({ error: "Params required" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const allCourses = async (req, res) => {
    try {
        let courses = await Course.find({});
        if (courses) {
            return res.status(200).json({ courses });
        }
        else {
            return res.status(400).json({ message: 'courses couldn\'t be obtained.' })
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { courseID } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(courseID, req.body, {
            new: true, // return the updated document
            runValidators: true, // run schema validators
        });
        if (updatedCourse) {
            return res.status(200).send(updatedCourse);
        }
        else {
            return res.status(404).send('Course not found');
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};