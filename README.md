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

6. Rename `.env.example` to `.env` and edit.

7. Sync with Database (only for production-mode)

```sh
pnpm sync
```

## Configuring .env

- **API_BASEURL**: This environment variable appears to define the base URL for the API. In this case, it's set to `http://127.0.0.1:3001`, which corresponds to the local development server's address (localhost) and port (3001). This variable is likely used by the client-side code to make API requests.

- **JWT_SECRET**: This environment variable seems to hold the secret key used for JSON Web Token (JWT) generation and validation. JWTs are often used for authentication and authorization purposes. The value `12345678` is likely a placeholder, and in a real application, you would want to use a more secure and random string as the JWT secret.

- **DATABASE_HOST**: This variable specifies the hostname or IP address of the database server. In this case, it's set to `localhost`, which means the database is hosted on the same machine as the application.

- **DATABASE_USER**: This is the username that the application uses to connect to the database. The value `root` suggests that the application might be using the root user to access the database, which might not be the best practice for security reasons.

- **DATABASE_PASSWORD**: This variable stores the password for the database user specified in `DATABASE_USER`. The value `12345678` is a placeholder; in a real-world scenario, you would use a strong, secure password.

- **DATABASE_NAME**: This is the name of the database that the application is connecting to. In this case, it's set to `app`.

These environment variables are often used to store configuration settings separately from the codebase. This practice allows you to change settings without modifying the code directly, making it easier to manage configurations for different environments (development, production, etc.). It's important to keep sensitive information (like passwords and secrets) in environment variables and not hardcode them in the codebase for security reasons.

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
pnpm start
```

Visit the appropriate URL in your web browser to access Swagger Docs `http://localhost:3001/docs`.
For the frontend to work it needs to be distributed through a web server (Nginx/Apache).
You can use Nginx reverse proxy for the backend.