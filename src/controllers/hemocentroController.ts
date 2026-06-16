import { Request, Response } from 'express';
import Hemocentro from '../models/Hemocentro';
import logger from '../utils/logger';

export const getAll = async (req: Request, res: Response) => {
  try {
    const hemocentros = await Hemocentro.find();
    res.json(hemocentros);
  } catch (error: any) {
    logger.error(`Erro ao buscar hemocentros: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { externalId, nome, endereco, telefone, lat, lng } = req.body;
    if (!nome || !endereco || !telefone || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const novoHemocentro = await Hemocentro.create({
      externalId,
      nome,
      endereco,
      telefone,
      lat,
      lng
    });

    logger.info(`Hemocentro ${nome} cadastrado com sucesso`);
    res.status(201).json(novoHemocentro);
  } catch (error: any) {
    logger.error(`Erro ao criar hemocentro: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
