import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { offeredCourseController } from "./offeredCourse.controller";
import { offeredCourseValidationSchema } from "./offeredCourse.validation";

const router = express.Router();

router.post(
	"/create-offered-course",
	Auth(USER_ROLE.admin),
	validateRequest(offeredCourseValidationSchema.createOfferedCourseZodSchema),
	offeredCourseController.createOfferedCourse
);

router.get(
	"/",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	offeredCourseController.findAllOfferedCourse
);
router.get(
	"/:OfferedCourseId",
	Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
	offeredCourseController.findSingleOfferedCourse
);
router.patch(
	"/:OfferedCourseId",
	Auth(USER_ROLE.admin),
	validateRequest(offeredCourseValidationSchema.updateOfferedCourseZodSchema),
	offeredCourseController.updateOfferedCourse
);
// router.delete("/:OfferedCourseId", offeredCourseController.deleteOfferedCourse);

export const offeredCourseRouter = router;
