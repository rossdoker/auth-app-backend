import { Request, Response } from 'express';
import { registerService } from '@/services/auth/index.js';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, gender, birthDate } = req.body;

  const result = await registerService({
    email,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
  });

  res.status(201).json(result);
};
