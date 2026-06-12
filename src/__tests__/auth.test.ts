import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import User from '../models/User';

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
  await User.deleteMany({});
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Usuário criado com sucesso');
    
    const user = await User.findOne({ email: 'test@test.com' });
    expect(user).toBeTruthy();
  });

  it('should not register a user with existing email', async () => {
    await User.create({ email: 'test@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@test.com',
        password: 'newpassword123'
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'E-mail já cadastrado');
  });

  it('should login an existing user', async () => {
    await User.create({ email: 'test@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('email', 'test@test.com');
    expect(res.body).toHaveProperty('login', true);
  });

  it('should not login with wrong credentials', async () => {
    await User.create({ email: 'test@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Credenciais inválidas');
  });
});
