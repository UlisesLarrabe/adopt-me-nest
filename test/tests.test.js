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
        name: 'Test',
        specie: 'cat',
        birthDate: '10-10-2020',
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
  });
});
