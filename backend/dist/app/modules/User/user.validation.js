"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// Allowed roles (must match USER_ROLE)
const userRoles = ['admin', 'user'];
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().nonempty({ message: 'Name is required' }),
        companyName: zod_1.z.string().nonempty({ message: 'Company name is required' }),
        email: zod_1.z
            .string()
            .nonempty({ message: 'Email is required' })
            .email({ message: 'Invalid email format' }),
        contactNumber: zod_1.z
            .string()
            .nonempty({ message: 'Contact number is required' })
            .regex(/^\+?[0-9]{8,15}$/, { message: 'Invalid contact number format' }),
        password: zod_1.z
            .string()
            .nonempty({ message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(20, { message: 'Password cannot exceed 20 characters' }),
        role: zod_1.z.enum(userRoles).default('user'),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
        contactNumber: zod_1.z
            .string()
            .regex(/^\+?[0-9]{8,15}$/, { message: 'Invalid contact number format' })
            .optional(),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(20, { message: 'Password cannot exceed 20 characters' })
            .optional(),
        role: zod_1.z.enum(userRoles).optional(),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
