import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Agendamento from '../models/Agendamento';
import Hemocentro from '../models/Hemocentro';
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

    let { userEmail, hemocentroId, hemocentroNome, data, horario } = req.body;
    
    if (!userEmail || !hemocentroNome || !data || !horario) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (userEmail, hemocentroNome, data, horario)' });
    }

    // Se o hemocentroId for fornecido e não for um ObjectId válido, tenta buscar pelo externalId
    if (hemocentroId && !mongoose.Types.ObjectId.isValid(hemocentroId)) {
      const hemocentro = await Hemocentro.findOne({ externalId: Number(hemocentroId) });
      if (hemocentro) {
        hemocentroId = hemocentro._id;
      } else {
        return res.status(404).json({ error: 'Hemocentro não encontrado com o ID fornecido' });
      }
    }

    const novoAgendamento = await Agendamento.create({
      userEmail,
      hemocentroId,
      hemocentroNome,
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
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

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
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

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
