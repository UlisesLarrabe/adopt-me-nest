import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

describe('Test de integracion', function () {
  const requester = supertest('http://localhost:3000');
  const MONGO_URL = process.env.MONGO_URL;
  describe('Test de mascotas', function () {
    beforeEach(async function () {
      await mongoose.connect(MONGO_URL);
    });
    it('El endpoint POST pets debe crear una mascota', async function () {
      const mockPet = {
        name: 'Luna',
        specie: 'dog',
        birthDate: '10-10-2022',
      };
      const { ok, body, statusCode } = await requester
        .post('/pets')
        .send(mockPet);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.true;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Pet created');
      expect(body).to.have.property('payload');
      expect(body.payload).to.have.property('_id');
    });
  });
  describe('Test de adopciones', function () {
    beforeEach(async function () {
      await mongoose.connect(MONGO_URL);
    });
    it('El endpoint POST adoptions debe crear una adopcion', async function () {
      const userId = '67b779c98dcb400d3d7398c0';
      const petId = '67bcc1d1d7cff2864cfba5d8';
      const { ok, body, statusCode } = await requester
        .post(`/adoptions/${userId}/${petId}`)
        .send();
      if (statusCode === 400) {
        return;
      }
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.true;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('adoption created');
    });
    it("Si se quiere adoptar una mascota ya adoptada, se debe devolver un mensaje diciendo 'Pet already adopted'", async function () {
      const userId = '67b779c98dcb400d3d7398c0';
      const petId = '67bcc1d1d7cff2864cfba5d8';
      const { ok, body, statusCode } = await requester
        .post(`/adoptions/${userId}/${petId}`)
        .send();
      expect(statusCode).to.be.equal(400);
      expect(ok).to.be.false;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Pet already adopted');
    });
    it('El endpoint GET adoptions debe devolver una lista de adopciones', async function () {
      const { ok, body, statusCode } = await requester.get('/adoptions');
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(body).to.be.an('array');
    });
    it('El endpoint GET adoptions/:id debe devolver una adopcion', async function () {
      const adoptionId = '67bcbe067687c68b45ef86eb';
      const { ok, body, statusCode } = await requester.get(
        `/adoptions/${adoptionId}`,
      );
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(body).to.have.property('pet');
      expect(body).to.have.property('owner');
    });
  });
  describe('Test de sesiones', function () {
    beforeEach(async function () {
      await mongoose.connect(MONGO_URL);
    });
    it('El endpoint POST register debe crear un usuario', async function () {
      const mockUser = {
        first_name: 'Federico',
        last_name: 'Taison',
        email: 'fed@email.com',
        password: '123456',
      };
      const { ok, body, statusCode } = await requester
        .post('/sessions/register')
        .send(mockUser);
      if (statusCode === 401) {
        return;
      }
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.true;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('User created');
    });
    it('El endpoint POST login debe devolver un token', async function () {
      const mockUser = {
        email: 'fed@email.com',
        password: '123456',
      };
      const { ok, body, statusCode } = await requester
        .post('/sessions/login')
        .send(mockUser);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(body).to.have.property('access_token');
    });
    it('El endpoint POST login debe devolver un mensaje de error si las credenciales son incorrectas', async function () {
      const mockUser = {
        email: 'fed@email.com',
        password: '1234567',
      };
      const { ok, body, statusCode } = await requester
        .post('/sessions/login')
        .send(mockUser);
      expect(statusCode).to.be.equal(401);
      expect(ok).to.be.false;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Invalid credentials');
    });
    it('El endpoint POST register debe devolver un mensaje de error si el email ya esta en uso', async function () {
      const mockUser = {
        first_name: 'Federico',
        last_name: 'Taison',
        email: 'fed@email.com',
        password: '123456',
      };
      const { ok, body, statusCode } = await requester
        .post('/sessions/register')
        .send(mockUser);
      expect(statusCode).to.be.equal(401);
      expect(ok).to.be.false;
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Email already in use');
    });
  });
  describe('Test de usuarios', function () {
    beforeEach(async function () {
      await mongoose.connect(MONGO_URL);
    });
    it('El endpoint GET users debe devolver una lista de usuarios', async function () {
      const { ok, body, statusCode } = await requester.get('/users');
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(body).to.be.an('array');
    });
    it('El endpoint GET users/:id debe devolver un usuario', async function () {
      const userId = '67b779c98dcb400d3d7398c0';
      const { ok, body, statusCode } = await requester.get(`/users/${userId}`);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(body).to.have.property('first_name');
      expect(body).to.have.property('last_name');
      expect(body).to.have.property('email');
    });
  });
});
