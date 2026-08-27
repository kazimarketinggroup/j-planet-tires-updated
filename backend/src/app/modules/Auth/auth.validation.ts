import { z } from 'zod';

// ✅ Login Schema
const LoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email format'),
    password: z.string().nonempty('Password is required'),
    rememberMe: z.boolean().optional(), 
  }),
});

// ✅ Register Schema
const RegisterSchema = z
  .object({
    body: z.object({
      fullName: z
        .string()
        .nonempty('Full name is required')
        .min(3, 'Full name must be at least 3 characters')
        .max(255, 'Full name must be at most 255 characters'),

      companyName: z
        .string()
        .nonempty('Company name is required')
        .min(2, 'Company name must be at least 2 characters')
        .max(255, 'Company name must be at most 255 characters'),

      email: z
        .string()
        .nonempty('Email is required')
        .email('Email must be a valid email'),

      contactNumber: z
        .string()
        .nonempty('Contact number is required')
        .regex(/^\+?[0-9]{8,15}$/, 'Invalid contact number format'),

      password: z
        .string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters'),

      confirmPassword: z.string().nonempty('Confirm Password is required'),

      rememberMe: z.boolean().optional(), 
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

export default AuthValidation;

// ✅ Optionally export inferred types
export type TLoginUser = z.infer<typeof LoginSchema>['body'];
export type TRegisterUser = z.infer<typeof RegisterSchema>['body'];
