import { readFile } from 'fs/promises';
import yaml from 'yaml';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export async function swaggerDocs(app: Express): Promise<void> {
  const file = await readFile('src/docs/swagger.yaml', 'utf8');
  const swaggerDocument = yaml.parse(file);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}


