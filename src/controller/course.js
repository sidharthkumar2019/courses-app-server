import {Course} from '../models/course.js';

export const addCourse = async (req, res) => {
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

    try {
        newCourse = await newCourse.save();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(201).send(newCourse);
};

export const getCourseById = async (req, res) => {
    const { courseID } = req.params;

    if (courseID) {
        let course;
        try {
            course = await Course.findOne({ _id: courseID });
        } catch (error) {
            return res.status(500).json({ error });
        }

        if (course)
            res.status(200).json({ course });
        else
            res.status(404).json({ message: 'No such course found.' });
    }
    else {
        return res.status(400).json({ error: "Params required" });
    }
}

export const deleteCourse = async (req, res) => {
    const { courseID } = req.params;
    if (courseID) {
        let course;
        try {
            course = await Course.deleteOne({ _id: courseID });
        } catch (error) {
            return res.status(500).json({ error });
        }
        if (course)
            res.status(202).json({ course: course });
        else
            res.status(404).json({ message: 'No such course found.' });
    }
    else
        return res.status(400).json({ error: "Params required" });
}

export const allCourses = async (req, res) => {
    let courses;
    try {
        courses = await Course.find({});
    } catch (error) {
        return res.status(400).json({ error });
    }
    if (courses)
        return res.status(200).json({ courses });
    else
        return res.status(400).json({ message: 'courses couldn\'t be obtained.' })
}

export const updateCourse = async (req, res) => {
    const { courseID } = req.params;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseID, req.body, {
            new: true, // return the updated document
            runValidators: true, // run schema validators
        });
        if (!updatedCourse) {
            return res.status(404).send('Course not found');
        }
        
        return res.status(200).send(updatedCourse);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};