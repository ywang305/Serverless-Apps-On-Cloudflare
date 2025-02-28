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

[01-example-worker.ts](src/01-example-worker.ts)

### 1.3 Run Scheduled

[01-example-scheduled.ts](src/01-example-scheduled.ts)

### 1.4 Deploy worker

```sh
pnpm run deploy
```

## 2. Build Serverless API

### 2.1 Route HTTP Request

` 	​$​ npm install itty-router --save`

[02-import-itty-router.ts](src/02-import-itty-router.ts)

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
​$​ npx wrangler d1 create photo-service
```
