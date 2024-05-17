import express from 'express';
const router = express.Router();
import { addCourse, allCourses, getCourseById, deleteCourse, updateCourse } from '../controller/course.js';

router.post('/course/create', addCourse);

router.get('/course/allCourses', allCourses);
router.get('/course/:courseID', getCourseById);

router.delete('/course/delete/:courseID', deleteCourse);

router.put('/course/update/:courseID', updateCourse)

export const courseRoutes = router;