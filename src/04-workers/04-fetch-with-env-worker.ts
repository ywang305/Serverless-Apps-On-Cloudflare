import type { Env } from './04-env';
import { Router } from 'itty-router';
import getImages from './04-get-images-handler';
import getSingleImage from './04-get-single-image-handler';
import createImage from './04-insert-row-handler';

const router = Router()

router.get('/images', getImages)
  .get('/images/:id', getSingleImage)
  .post('/images', createImage)
  .get('*', () => new Response('Not found', { status: 404 }));

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return router.fetch(request, env);
  },
};
