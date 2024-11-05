import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";
const router = express.Router();

router.get("/", courseController.findCoursesFromDb);
router.post(
	"/create-course",
	validateRequest(courseValidation.CreateCourseValidationSchema),
	courseController.createCourseIntoDb
);
router.get("/:id", courseController.findSingleCourseFromDb);
router.patch(
	"/:id",
	courseController.updateCourseToDb,
	validateRequest(courseValidation.updateCourseValidationSchema)
);
router.put(
	"/:courseId/assign-faculties",
	validateRequest(courseValidation.assignFacultiesWithCourseValidationSchema),
	courseController.assignFacultiesIntoDB
);
router.delete("/:id", courseController.deleteCourseFromDb);

export const courseRouter = router;
