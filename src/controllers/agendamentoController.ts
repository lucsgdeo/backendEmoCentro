import { Request, Response } from 'express';
import Agendamento from '../models/Agendamento';
import logger from '../utils/logger';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.query;
    
    const filter: any = {};
    if (typeof userEmail === 'string') {
      filter.userEmail = userEmail;
    }
    
    const agendamentos = await Agendamento.find(filter).populate('hemocentroId');
    res.json(agendamentos);
  } catch (error: any) {
    logger.error(`Erro ao buscar agendamentos: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Corpo da requisição é obrigatório' });
    }

    const { userEmail, hemocentroId, data, horario } = req.body;
    
    if (!userEmail || !hemocentroId || !data || !horario) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (inclusive userEmail)' });
    }

    const novoAgendamento = await Agendamento.create({
      userEmail,
      hemocentroId,
      data,
      horario
    });

    logger.info(`Agendamento criado para ${userEmail} no hemocentro ${hemocentroId}`);
    res.status(201).json(novoAgendamento);
  } catch (error: any) {
    logger.error(`Erro ao criar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, horario, userEmail } = req.body || {};

    const filter: any = { _id: id };
    if (typeof userEmail === 'string') {
      filter.userEmail = userEmail;
    }

    const agendamento = await Agendamento.findOneAndUpdate(
      filter,
      { data, horario },
      { returnDocument: 'after' }
    );

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    logger.info(`Agendamento ${id} atualizado`);
    res.json(agendamento);
  } catch (error: any) {
    logger.error(`Erro ao atualizar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userEmail } = req.body || {};

    const filter: any = { _id: id };
    if (typeof userEmail === 'string') {
      filter.userEmail = userEmail;
    }

    const agendamento = await Agendamento.findOneAndDelete(filter);

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    logger.info(`Agendamento ${id} removido`);
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Erro ao deletar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
