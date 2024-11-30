import { FastifyInstance } from 'fastify';
import vaccinationPoints from '../data/vaccinationPoints.json';

export default async function (app: FastifyInstance) {
  app.get('/:cityId', async (request, reply) => {
    const { cityId } = request.params as { cityId: string };
    const points = vaccinationPoints.filter(p => p.cityId === Number(cityId));

    if (!points.length) {
      reply.status(404).send({ message: 'Nenhum ponto de vacinação encontrado para esta cidade' });
    }
    return points;
  });
}
