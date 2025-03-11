import { DurableObject } from "cloudflare:workers";
import html from "./app.html"
export { Chat } from "./chat"

import {
  error,
  Router,
} from 'itty-router'

const router = Router();

router
  .get('/', () => {
    return new Response(
      html,
      {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      }
    );
  })
  .get('/api/chat', (request: Request, env: Env) => {
    const chatId = new URL(request.url).searchParams.get('chatId')

    if (!chatId) {
      return new Response("Chat ID is missing", { status: 400 });
    }

    const doId = env.CHATS.idFromName(chatId);
    const chat = env.CHATS.get(doId);

    if (request.headers.get("Upgrade") != "websocket") {
      return new Response("expected websocket", { status: 400 });
    }

    return chat.fetch(request.clone());
  })
  .all('*', () => error(404))

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return router.fetch(request, env);
  },
};
