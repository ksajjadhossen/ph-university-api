import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be String",
    })
    .max(20, { message: "Password must be in 20 characters" }),
});

export default userValidationSchema;
