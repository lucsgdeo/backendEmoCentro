import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hemocentro from '../models/Hemocentro';
import connectDB from '../config/db';
import fs from 'fs';
import path from 'path';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    
    const filePath = path.join(__dirname, '../../data/hemocentros.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await Hemocentro.deleteMany({});
    
    const hemocentrosToInsert = data.map((h: any) => ({
      externalId: h.id,
      nome: h.nome,
      endereco: h.endereco,
      telefone: h.telefone,
      lat: h.lat,
      lng: h.lng
    }));

    await Hemocentro.insertMany(hemocentrosToInsert);
    console.log('Banco de dados semeado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao semear banco de dados:', error);
    process.exit(1);
  }
};

seed();
