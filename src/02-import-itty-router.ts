import { Router } from 'itty-router'
import createImage from './handlers/02-create-image-func';
import getImages from './handlers/02-get-images-func';
import getSingleImage from './handlers/02-get-single-image-func';

const router = Router()

router.get('/images', getImages)
  .get('/images/:id', getSingleImage)
  .post('/images', createImage)
  .get('*', () => new Response('Not found', { status: 404 }));

export interface Env {
  // MY_KV_NAMESPACE: KVNamespace;​
}


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return router.fetch(request);
  },
};
