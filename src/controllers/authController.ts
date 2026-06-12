import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    // Debugging: Log the received body
    console.log('Register attempt with body:', req.body);

    if (!req.body) {
      logger.error('Corpo da requisição ausente (req.body is undefined)');
      return res.status(400).json({ error: 'Corpo da requisição é obrigatório' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    await User.create({ email, password });
    logger.info(`Usuário ${email} criado com sucesso`);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error: any) {
    logger.error(`Erro no registro: ${error.message}`);
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Corpo da requisição é obrigatório' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' });

    logger.info(`Usuário ${email} logou no sistema`);
    res.json({ 
      token, 
      user: { email: user.email },
      login: true 
    });
  } catch (error: any) {
    logger.error(`Erro no login: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
