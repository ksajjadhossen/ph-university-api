import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAllAdmins);
router.patch("/:adminId", adminController.updateAdmin);

export const adminRouter = router;
