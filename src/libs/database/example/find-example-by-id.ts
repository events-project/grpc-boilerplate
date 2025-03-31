import { Example } from '@prisma/client';
import { db } from '../db';

export const findExampleById = async (id: string): Promise<Example | null> => {
  try {
    const result = await db.example.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error('Failed to find example by id');
  }
};
