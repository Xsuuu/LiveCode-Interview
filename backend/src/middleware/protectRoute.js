import { clerkMiddleware, getAuth } from '@clerk/express';

import User from '../models/User.js';

export const protectRoute = [
  clerkMiddleware(),
  async (req, res, next) => {
    try {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId)
        return res.status(401).json({ msg: 'Unauthorized = invalid token' });

      //find user in db by clerk ID
      const user = await User.findOne({ clerkId });

      if (!user) return res.status(404).json({ msg: 'User not found' });

      //attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error('Error in protectRoute midddleware', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
];
