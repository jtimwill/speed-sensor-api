const { Jump, sequelize } = require('../../sequelize');
const server = require('../../index');
const request = require('supertest')(server);

describe('/api/jumps', () => {
  afterEach(async () => {
    await Jump.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /ID', () => {
    let jump;

    const response = async (id) => {
      return await request.get(`/api/jumps/${id}`);
    };

    beforeEach(async () => {
      jump = await Jump.create({ data: 'School' });
    });

    it('should return 404 if invalid jump ID', async () => {
      const jump_id = 'id';
      const res = await response(jump_id);

      expect(res.status).toBe(404);
    });

    it('should return 404 if jump ID valid but jump ID not in DB', async () => {
      const jump_id = '10000';
      const res = await response(jump_id);

      expect(res.status).toBe(404);
    });

    it('should return specific jump if valid  ID', async () => {
      const res = await response(jump.id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', jump.id);
      expect(res.body).toHaveProperty('data', jump.data);
    });
  });

  describe('POST /', () => {
    let jump_object;

    const response = async (object) => {
      return await request
        .post('/api/jumps')
        .send(object);
    };

    beforeEach(async () => {
      jump_object = { data: 'books' };
    });

    it('should return 400 if jump is invalid', async () => {
      jump_object = {};
      const res = await response(jump_object);

      expect(res.status).toBe(400);
    });

    it('should save jump if jump is valid', async () => {
      const res = await response(jump_object);
      const jump = await Jump.findOne({ where: { data: 'books' } });

      expect(jump).toHaveProperty('id');
      expect(jump).toHaveProperty('data', 'books');
    });

    it('should return jump if jump is valid', async () => {
      const res = await response(jump_object);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data', 'books');
    });
  });

  describe('PUT /ID', () => {
    let jump, jump_object;

    const response = async (object, id) => {
      return await request
        .put('/api/jumps/' + id)
        .send(object);
    };

    beforeEach(async () => {
      jump = await Jump.create({ data: 'books' });
      jump_object = { data: 'movies' };
    });

    it('should return 404 if invalid jump ID ', async () => {
      const jump_id = 'id';
      const res = await response(jump_object, jump_id);

      expect(res.status).toBe(404);
    });

    it('should return 404 if jump ID valid but not in DB', async () => {
      const jump_id = '10000';
      const res = await response(jump_object, jump_id);

      expect(res.status).toBe(404);
    });

    it('should return 400 if jump is invalid', async () => {
      const jump_object = {};
      const res = await response(jump_object, jump.id);

      expect(res.status).toBe(400);
    });

    it('should update jump if input is valid', async () => {
      const res = await response(jump_object, jump.id);
      const result = await Jump.findOne({ where: { id: jump.id } });

      expect(result).toHaveProperty('data', 'movies');
    });

    it('should return updated jump if it is valid', async () => {
      const res = await response(jump_object, jump.id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', jump.id);
      expect(res.body).toHaveProperty('data', 'movies');
    });
  });

  describe('DELETE /ID', () => {
    let jump;

    const response = async (id) => {
      return await request
        .delete('/api/jumps/' + id);
    };

    beforeEach(async () => {
      jump = await Jump.create({ data: 'books' });
    });

    it('should return 404 if invalid jump ID', async () => {
      const jump_id = 'id';
      const res = await response(jump_id);

      expect(res.status).toBe(404);
    });

    it('should return 404 if jump ID valid but not in DB', async () => {
      const jump_id = '100000';
      const res = await response(jump_id);

      expect(res.status).toBe(404);
    });

    it('should delete jump if input is valid', async () => {
      const res = await response(jump.id);
      const result = await Jump.findOne({ where: { id: jump.id } });

      expect(result).toBeNull();
    });

    it('should return deleted ', async () => {
      const res = await response(jump.id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', jump.id);
      expect(res.body).toHaveProperty('data', jump.data);
    });
  });
});
