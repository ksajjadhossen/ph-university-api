import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseController } from "./offeredCourse.controller";
import { offeredCourseValidationSchema } from "./offeredCourse.validation";

const router = express.Router();

router.post(
	"/create-offered-course",
	validateRequest(offeredCourseValidationSchema.createOfferedCourseZodSchema),
	offeredCourseController.createOfferedCourse
);

router.get("/", offeredCourseController.findAllOfferedCourse);
router.get(
	"/:OfferedCourseId",
	offeredCourseController.findSingleOfferedCourse
);
router.patch(
	"/:OfferedCourseId",
	validateRequest(offeredCourseValidationSchema.createOfferedCourseZodSchema),
	offeredCourseController.updateOfferedCourse
);
router.delete("/:OfferedCourseId", offeredCourseController.deleteOfferedCourse);

export const offeredCourseRouter = router;
