import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import citiesRoutes from './routes/cities';
import vaccinationPointsRoutes from './routes/vaccinationPoints';

const app = Fastify();

app.register(cors);
app.register(helmet);
app.register(swagger, {
  swagger: {
    info: {
      title: 'Vaccination API',
      description: 'API para listar pontos de vacinação em Alagoas.',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});
app.register(swaggerUi, {
  routePrefix: '/docs',
  staticCSP: true,
  transformStaticCSP: (header) => header,
});


app.register(citiesRoutes, { prefix: '/cities' });
app.register(vaccinationPointsRoutes, { prefix: '/vaccination-points' });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
