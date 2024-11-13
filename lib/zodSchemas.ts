import {z} from 'zod'

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(50),
    userName: z.string().min(3).max(50).regex(/^[a-zA-Z0-9-]+$/, {
        message: 'Username can only contain letters, numbers and -',
    }),
});