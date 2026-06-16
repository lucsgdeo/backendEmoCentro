import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Agendamento from '../models/Agendamento';
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
  await Agendamento.deleteMany({});
  await Hemocentro.deleteMany({});
});

describe('Agendamento Endpoints', () => {
  it('should create a new agendamento', async () => {
    const hemocentro = await Hemocentro.create({
      nome: 'Hemocentro Teste',
      endereco: 'End',
      telefone: '123',
      lat: 0,
      lng: 0
    });

    const res = await request(app)
      .post('/api/agendamentos')
      .send({
        userEmail: 'user@test.com',
        hemocentroId: hemocentro._id,
        data: '2026-10-10',
        horario: '10:00'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userEmail', 'user@test.com');
  });

  it('should create a new agendamento using externalId (numeric)', async () => {
    const hemocentro = await Hemocentro.create({
      externalId: 1,
      nome: 'Hemocentro Teste Numeric',
      endereco: 'End',
      telefone: '123',
      lat: 0,
      lng: 0
    });

    const res = await request(app)
      .post('/api/agendamentos')
      .send({
        userEmail: 'user2@test.com',
        hemocentroId: "1",
        data: '2026-10-10',
        horario: '10:00'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userEmail', 'user2@test.com');
    // Verify it saved the actual ObjectId
    expect(res.body.hemocentroId).toBe(hemocentro._id.toString());
  });

  it('should list agendamentos by userEmail', async () => {
    const hemocentro = await Hemocentro.create({
      nome: 'Hemocentro Teste',
      endereco: 'End',
      telefone: '123',
      lat: 0,
      lng: 0
    });

    await Agendamento.create({
      userEmail: 'user@test.com',
      hemocentroId: hemocentro._id,
      data: '2026-10-10',
      horario: '10:00'
    });

    const res = await request(app).get('/api/agendamentos?userEmail=user@test.com');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].userEmail).toBe('user@test.com');
  });

  it('should update an agendamento', async () => {
    const hemocentro = await Hemocentro.create({
      nome: 'Hemocentro Teste',
      endereco: 'End',
      telefone: '123',
      lat: 0,
      lng: 0
    });

    const agendamento = await Agendamento.create({
      userEmail: 'user@test.com',
      hemocentroId: hemocentro._id,
      data: '2026-10-10',
      horario: '10:00'
    });

    const res = await request(app)
      .put(`/api/agendamentos/${agendamento._id}`)
      .send({
        data: '2026-11-11',
        horario: '11:00'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBe('2026-11-11');
  });

  it('should delete an agendamento', async () => {
    const hemocentro = await Hemocentro.create({
      nome: 'Hemocentro Teste',
      endereco: 'End',
      telefone: '123',
      lat: 0,
      lng: 0
    });

    const agendamento = await Agendamento.create({
      userEmail: 'user@test.com',
      hemocentroId: hemocentro._id,
      data: '2026-10-10',
      horario: '10:00'
    });

    const res = await request(app).delete(`/api/agendamentos/${agendamento._id}`);
    
    expect(res.statusCode).toEqual(204);
    
    const count = await Agendamento.countDocuments();
    expect(count).toBe(0);
  });
});
