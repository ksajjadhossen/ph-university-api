import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAllAdminsFromDb);
router.patch("/:adminId", adminController.updateAdminFromDb);
router.delete("/:adminId", adminController.deleteAdminFromDb);

export const adminRouter = router;
