import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { redis } from '../lib/cache';

const prisma = new PrismaClient();

export class UsersController {
  static async findAll(req: Request, res: Response) {
    try {
      const cacheKey = 'users:all';
      const cachedUsers = await redis.get(cacheKey);

      if (cachedUsers) {
        res.json(JSON.parse(cachedUsers));
      }

      const users = await prisma.user.findMany();

      await redis.set(cacheKey, JSON.stringify(users));
      res.json(users);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
