const Hemocentro = require('../models/Hemocentro');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
  try {
    const hemocentros = await Hemocentro.find();
    res.json(hemocentros);
  } catch (error) {
    logger.error(`Erro ao buscar hemocentros: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, endereco, telefone, lat, lng } = req.body;
    if (!nome || !endereco || !telefone || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const novoHemocentro = await Hemocentro.create({
      nome,
      endereco,
      telefone,
      lat,
      lng
    });

    logger.info(`Hemocentro ${nome} cadastrado com sucesso`);
    res.status(201).json(novoHemocentro);
  } catch (error) {
    logger.error(`Erro ao criar hemocentro: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
