"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// ✅ Login Schema
const LoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .nonempty('Email is required')
            .email('Invalid email format'),
        password: zod_1.z.string().nonempty('Password is required'),
        rememberMe: zod_1.z.boolean().optional(),
    }),
});
// ✅ Register Schema
const RegisterSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string()
            .nonempty('Full name is required')
            .min(3, 'Full name must be at least 3 characters')
            .max(255, 'Full name must be at most 255 characters'),
        companyName: zod_1.z
            .string()
            .nonempty('Company name is required')
            .min(2, 'Company name must be at least 2 characters')
            .max(255, 'Company name must be at most 255 characters'),
        email: zod_1.z
            .string()
            .nonempty('Email is required')
            .email('Email must be a valid email'),
        contactNumber: zod_1.z
            .string()
            .nonempty('Contact number is required')
            .regex(/^\+?[0-9]{8,15}$/, 'Invalid contact number format'),
        password: zod_1.z
            .string()
            .nonempty('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: zod_1.z.string().nonempty('Confirm Password is required'),
        rememberMe: zod_1.z.boolean().optional(),
    }),
})
    // ✅ custom refinement: confirmPassword === password
    .superRefine(({ body }, ctx) => {
    if (body.password !== body.confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            path: ['body', 'confirmPassword'],
            message: 'Passwords do not match',
        });
    }
});
const AuthValidation = { LoginSchema, RegisterSchema };
exports.default = AuthValidation;
