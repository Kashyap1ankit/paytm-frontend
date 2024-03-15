import zod from "zod";

const userSignupSchema = zod.object({
  username: zod
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 letters" })
    .max(30, { message: "Cannot be greater than 30 letters" }),

  firstName: zod
    .string({ required_error: "Name is required" })
    .min(1, { message: "Atleast one letter is required" }),

  lastName: zod.string(),

  email: zod
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email type",
    })
    .email(),

  password: zod
    .string()
    .min(6, { message: "Cannot be less than 6 letters" })
    .max(10, { message: "Cannot be greater than 10 letters" }),
});

//Signin schema

const userSigninSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6).max(10),
});

//Updation schema

const userUpdateSchema = zod.object({
  firstName: zod
    .string({ required_error: "Name is required" })
    .min(1, { message: "Atleast one letter is required" }),

  lastName: zod.string(),
  password: zod.string().min(6).max(10),
});

//Send money schema

const sendMoneySchema = zod.object({
  amount: zod.number().min(1),
});
export {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
  sendMoneySchema,
};
