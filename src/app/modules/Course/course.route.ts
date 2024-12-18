import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";
const router = express.Router();

router.get("/", courseController.findCoursesFromDb);
router.post(
	"/create-course",
	Auth(USER_ROLE.admin),
	validateRequest(courseValidation.CreateCourseValidationSchema),
	courseController.createCourseIntoDb
);
router.get(
	"/:id",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	courseController.findSingleCourseFromDb
);
router.patch(
	"/:id",
	courseController.updateCourseToDb,
	Auth(USER_ROLE.admin),
	validateRequest(courseValidation.updateCourseValidationSchema)
);
router.put(
	"/:courseId/assign-faculties",
	Auth(USER_ROLE.admin),
	validateRequest(courseValidation.facultiesWithCourseValidationSchema),
	courseController.assignFacultiesIntoDB
);
router.delete(
	"/:courseId/delete-faculties",
	Auth(USER_ROLE.admin),
	validateRequest(courseValidation.facultiesWithCourseValidationSchema),
	courseController.deleteFacultiesFromDB
);
router.delete("/:id", courseController.deleteCourseFromDb);

export const courseRouter = router;
