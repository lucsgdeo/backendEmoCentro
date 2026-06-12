import { Response } from 'express';
import Agendamento from '../models/Agendamento';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/auth';

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });
    
    const agendamentos = await Agendamento.find({ userEmail: req.user.email }).populate('hemocentroId');
    res.json(agendamentos);
  } catch (error: any) {
    logger.error(`Erro ao buscar agendamentos: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });

    const { hemocentroId, data, horario } = req.body;
    if (!hemocentroId || !data || !horario) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const novoAgendamento = await Agendamento.create({
      userEmail: req.user.email,
      hemocentroId,
      data,
      horario
    });

    logger.info(`Agendamento criado para ${req.user.email} no hemocentro ${hemocentroId} em ${data} ${horario}`);
    res.status(201).json(novoAgendamento);
  } catch (error: any) {
    logger.error(`Erro ao criar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });

    const { id } = req.params;
    const { data, horario } = req.body;

    const agendamento = await Agendamento.findOneAndUpdate(
      { _id: id, userEmail: req.user.email },
      { data, horario },
      { new: true }
    );

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    logger.info(`Agendamento ${id} atualizado para ${req.user.email}`);
    res.json(agendamento);
  } catch (error: any) {
    logger.error(`Erro ao atualizar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });

    const { id } = req.params;
    const agendamento = await Agendamento.findOneAndDelete({ _id: id, userEmail: req.user.email });

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    logger.info(`Agendamento ${id} removido por ${req.user.email}`);
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Erro ao deletar agendamento: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
