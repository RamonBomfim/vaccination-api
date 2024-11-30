import { FastifyInstance } from 'fastify';
import cities from '../data/cities.json';

export default async function (app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return cities;
  });

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const city = cities.find(c => c.id === Number(id));

    if (!city) {
      reply.status(404).send({ message: 'Cidade não encontrada' });
    }
    return city;
  });
}
