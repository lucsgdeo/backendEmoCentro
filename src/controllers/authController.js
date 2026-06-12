const User = require('../models/User');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const user = await User.create({ email, password });
    logger.info(`Usuário ${email} criado com sucesso`);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    logger.error(`Erro no registro: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    logger.info(`Usuário ${email} logou no sistema`);
    res.json({ 
      token, 
      user: { email: user.email },
      login: true 
    });
  } catch (error) {
    logger.error(`Erro no login: ${error.message}`);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
