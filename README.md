Serverless Apps on Cloudflare is a book focussed on how to build applications on Cloudflare's developer platform.
https://github.com/apeacock1991/serverless-apps-on-cloudflare

## 1. Deploy Your First Cloudflare Worker

### 1.1 Create worker

```sh
​  ​$​ npm create cloudflare@latest <NAME>

  # Agree to install the create-cloudflare npm module.
  # For the directory, you can use whatever you like. I’m going to use photo-service. This will also, by default, be the name of your Worker.
  # Select “Hello World” Worker.
  # Use TypeScript.
  # Use Git.
  # Lastly, it will ask if you want to deploy your application. For now, opt not to deploy.
```

### 1.2 Implement Logic in Worker

[01-example-worker.ts](photo-service/src/01-workers//01-example-worker.ts)

### 1.3 Run Scheduled

[01-example-scheduled.ts](photo-service/src/01-workers/01-example-scheduled.ts)

### 1.4 Deploy worker

```sh
pnpm run deploy
```

## 2. Build Serverless API

### 2.1 Route HTTP Request

` 	​$​ npm install itty-router --save`

[02-import-itty-router.ts](photo-service/src/02-workers/02-import-itty-router.ts)

### 2.2 POST/GET

```sh
  # start worker
  $npx wrangler dev src/02-import-itty-router.ts

  # create resource
  $​ curl --data ​\​
​ 	  ​'{ "id": 4, "url": "https://example.com/some_image.png", "author": "Lia" }'​ ​\​
​ 	  -H ​'Content-Type: application/json'​ http://0.0.0.0:8787/images

  # get resources
  http://localhost:8787/images
```

## 4. Database D1

### 4.1 Create Database

```sh
​$​ npx wrangler d1 create photo-service # photo-server is db name
```

### 4.2 Connect db to worker - binding

```json
{
  "d1_databases": [
    {
      "binding": "DB", // i.e. available in your Worker on env.DB
      "database_name": "photo-service",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

### 4.3 Db Migration

```sh
  # ​$​ npx wrangler d1 migrations create <DATABASE_NAME> <MIGRATION_NAME>
​  $​ npx wrangler d1 migrations create photo-service initial_creation
```

> ​Successfully created Migration '0000_initial-creation.sql'!
> The migration is available for editing here migrations/0000_initial-creation.sql

write sql in [migrations/0000_initial-creation.sql](photo-service/migrations/0000_initial-creation.sql)

> Make sure you keep the comment at the top of the file. It was created by Cloudflare to keep track of migrations.

### 4.4 Run Migration

on remote product db

```sh
​​$​ npx wrangler d1 migrations apply photo-service --remote
```

on local dev db

```sh
$​ npx wrangler d1 migrations apply photo-service --local
```

### 4.4 Query

worker code: [04-fetch-with-env-worker.ts](photo-service/src/04-workers/04-fetch-with-env-worker.ts)

```sh
npx wrangler dev src/04-workers/04-fetch-with-env-worker.ts
```

- return last two images http://localhost:8787/images?count=2

- return single image id=3 http://localhost:8787/images/3

- insert one
  ```sh
  http localhost:8787/images \
    category_id=2 \
    user_id=100 \
    image_url=https://placehold.co/600x400 \
    format=PNG \
    resolution=100x100 \
    title="Example 4" \
    file_size_bytes=500
  ```

5 Worker-To-Worker Communication

reference to [authentication-service](https://github.dev/apeacock1991/serverless-apps-on-cloudflare/tree/main/authentication-service)

- Make a Worker Private
  workers_dev = ​false​ in wrangler.toml
- Store Secrets
  - a global secret \
    `$​ wrangler secret put API_AUTH_KEY`
  - a local secret only in dev \
    .dev.vars
    ```json
    {
      "API_AUTH_KEY": "your-secret-key"
    }
    ```
  - a local secret deployed to prod \
    wrangler.json
    ```json
    {
      "vars": {
        "API_AUTH_KEY": "your-secret
      }
    }
    ```

## 8 KV cache

a Next.js app hosted on Page, its `/api/*` is perfectly running in worker ( backend/just like Function )

### 8.1 KV Namespace

create kv to cloudflare

```sh
	​$​ npx wrangler kv namespace create WEATHER_CACHE
```

bind kv namespace to app runtime

```sh
{
  "kv_namespaces": [
    {
      "binding": "WEATHER_CACHE",
      "id": "06779da6940b431db6e566b4846d64db"
    }
  ]
}
```

inject WEATHER_CACHE kv into runtime
[weather-app/env.d.ts](./weather-app/env.d.ts)

```ts
interface CloudflareEnv {
  WEATHER_CACHE: KVNamespace;
}
```

### 8.2 Log on Deploy

When you were testing locally, you were able to confirm the cache was being used from the logs. You can do the same when the application is deployed to Cloudflare, albeit it from the Cloudflare dashboard.

Go to Workers & Pages, and click the project for the weather application. It’ll take you to a list of deployments, click view details on the most recent one. On the next page, select Functions from the submenu and scroll down until you see Real-time logs.

## 13 Websockets with Durable Objects

You learned how to render HTML from a Worker, and how that compares to Cloudflare Pages.

First, binding in wrangler config

> store asset like public/index.html.
> As Workers don’t have access to the file system during runtime, you can’t just load the HTML from the file and serve it. Instead, you can configure the Worker to be able to serve static assets from a specific folder by editing the wrangler.toml file:

```json
  "assets": {
    "binding": "ASSETS",
    "directory": "./public"
  },
```

> You define a directory where your static assets will be served from. When a request comes into a Worker with assets defined, it first checks to see if the path requested matches a static asset; if it does, that’ll be returned. If no matches are found, it’ll execute the fetch method of your Worker. More information on routing can be found in the docs.
> You can then dynamically access assets from your Worker if you need to, using `env.ASSETS.fetch(request)`.

[Serve HTML from a Worker \_ Serverless Apps on Cloudflare](./chat-app-durable-objects/Serve%20HTML%20from%20a%20Worker%20_%20Serverless%20Apps%20on%20Cloudflare.pdf)

Second, serve various endpoints for asset and worker logic using itty-router, see [index.ts](./chat-app-durable-objects/src/index.ts)

## 15 Deploy To Production

### Logs/observability

allows you to store logs for your Workers for up to seven days on the Workers Paid plan, or three days on the free plan

```yml
​[observability]​
​ 	enabled = ​true​
​ 	head_sampling_rate = 1 ​# optional. default = 1.
```
