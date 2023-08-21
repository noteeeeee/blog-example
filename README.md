# Blog Example

This repository contains an example Node.js application built using Nest.js and Nuxt 3. The application serves as a simple demonstration of how to set up a project using these tools.

## Installation

To get started with the application, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/noteeeeee/blog-example.git
   ```

2. Navigate to the repository directory:

   ```sh
   cd blog-example
   ```

3. Install PNPM (if not already installed):

   ```sh
   npm install -g pnpm
   ```

4. Navigate to the application's directory:

   ```sh
   cd ./blog-example-main
   ```

5. Install dependencies using PNPM:

   ```sh
   pnpm install
   ```

6. Rename `.env.example` to `.env` and edit

7. Sync with Database (only for production-mode)

```sh
pnpm sync
```

8. Install PM2 (if not already installed, only for production-mode):

   ```sh
   npm install -g pnpm
   ```

## Developer mode

Once the dependencies are installed, you can start the application using the following command:

```sh
pnpm dev
```

Visit the appropriate URL in your web browser to access the running application `http://localhost:3000`.
Visit the appropriate URL in your web browser to access Swagger Docs `http://localhost:3001/docs`.

## Developer mode

Once the dependencies are installed, you can start the application using the following command:

```sh
pm2 start ./ecosystem.js
```

Visit the appropriate URL in your web browser to access Swagger Docs `http://localhost:3001/docs`.
For the frontend to work it needs to be distributed through a web server (Nginx/Apache).
You can use Nginx reverse proxy for the backend.