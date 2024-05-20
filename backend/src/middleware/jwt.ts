import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import log4js from './log4js';

const logger = log4js.getLogger();

class JWT {

    async createToken(user_id: string, expiresIn: number | string = "3d") {
        return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: expiresIn });
    }

}

export default new JWT();