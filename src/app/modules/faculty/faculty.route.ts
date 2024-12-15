import { Router } from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { facultyController } from "./faculty.controller";
import { facultyValidationSchema } from "./faculty.validation";

const router = Router();
router.get(
	"/",
	Auth(USER_ROLE.admin, USER_ROLE.faculty),
	facultyController.getAllFaculties
);
router.get("/:facultyId", facultyController.getSingleFacultyById);
router.delete("/:id", facultyController.deleteFacultyById);
router.patch(
	"/:facultyId",
	validateRequest(facultyValidationSchema.updateFacultySchema),
	facultyController.updateFacultyById
);

export const facultyRouter = router;
