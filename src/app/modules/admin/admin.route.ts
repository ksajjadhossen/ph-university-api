import express from "express";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constant";
import { adminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";
const router = express.Router();

router.get("/", Auth(USER_ROLE.admin), adminController.getAllAdminsFromDb);
router.patch(
	"/:adminId",
	Auth(USER_ROLE.admin),
	validateRequest(adminValidationSchema.updateAdminValidationSchema),
	adminController.updateAdminFromDb
);
router.delete("/:id", Auth(USER_ROLE.admin), adminController.deleteAdminFromDb);

export const adminRouter = router;
