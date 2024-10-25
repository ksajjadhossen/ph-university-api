import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";
const router = express.Router();

router.get("/", adminController.getAllAdminsFromDb);
router.patch(
	"/:adminId",
	validateRequest(adminValidationSchema.updateAdminValidationSchema),
	adminController.updateAdminFromDb
);
router.delete("/:id", adminController.deleteAdminFromDb);

export const adminRouter = router;
