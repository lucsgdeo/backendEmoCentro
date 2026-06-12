import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Register attempt with body:', req.body);

    if (!req.body) {
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

    logger.info(`Usuário ${email} logou no sistema (sem JWT)`);
    res.json({ 
      user: { email: user.email },
      login: true,
      message: "Autenticação simplificada (sem JWT)"
    });
  } catch (error: any) {
    logger.error(`Erro no login: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
