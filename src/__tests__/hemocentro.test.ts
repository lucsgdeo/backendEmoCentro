import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Hemocentro from '../models/Hemocentro';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Hemocentro.deleteMany({});
});

describe('Hemocentro Endpoints', () => {
  it('should create a new hemocentro', async () => {
    const res = await request(app)
      .post('/api/hemocentros')
      .send({
        nome: 'Hemocentro Teste',
        endereco: 'Rua Teste, 123',
        telefone: '1199999999',
        lat: -23.5,
        lng: -46.6
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('nome', 'Hemocentro Teste');
  });

  it('should list all hemocentros', async () => {
    await Hemocentro.create({
      nome: 'Hemocentro 1',
      endereco: 'End 1',
      telefone: '111',
      lat: 0,
      lng: 0
    });

    const res = await request(app).get('/api/hemocentros');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
