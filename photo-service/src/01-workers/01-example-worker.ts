export interface Env {
  // MY_KV_NAMESPACE: KVNamespace;​
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return new Response('Hello 01 example worker!');
  },
};
