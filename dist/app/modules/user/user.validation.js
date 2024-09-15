"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be String",
    })
        .max(20, { message: "Password must be in 20 characters" }),
});
exports.default = userValidationSchema;
