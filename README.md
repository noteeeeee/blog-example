# Blog Example

This repository contains an example Node.js application built using Nest.js and Nuxt 3. The application serves as a simple demonstration of how to set up a project using these tools.

## Installation

To get started with the application, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/noteeeeee/blog-example.git
   ```

2. Install PNPM (if not already installed):

   ```sh
   npm install -g pnpm
   ```

3. Navigate to the application's directory:

   ```sh
   cd ./blog-example-main
   ```

4. Install dependencies using PNPM:

   ```sh
   pnpm install
   ```

5. Rename `.env.example` to `.env` and configure.

6. Build application (only for production-mode)

   ```sh
   pnpm build
   ```

7. Sync with Database (only for production-mode)

   ```sh
   pnpm sync
   ```

## Configuring .env

- **APP_BASEURL** is likely used to define the base URL for generating URLs within a sitemap in your application. A sitemap is a file that lists all the pages of a website to help search engines understand the site's structure and content.

- **API_BASEURL**: This environment variable appears to define the base URL for the API. In this case, it's set to `http://127.0.0.1:3001`, which corresponds to the local development server's address (localhost) and port (3001). This variable is likely used by the client-side code to make API requests.

- **JWT_SECRET**: This environment variable seems to hold the secret key used for JSON Web Token (JWT) generation and validation. JWTs are often used for authentication and authorization purposes. The value `12345678` is likely a placeholder, and in a real application, you would want to use a more secure and random string as the JWT secret.

- **DATABASE_HOST**: This variable specifies the hostname or IP address of the MySQL database server. In this case, it's set to `localhost`, which means the database is hosted on the same machine as the application.

- **DATABASE_USER**: This is the username that the application uses to connect to the MySQL database. The value `root` suggests that the application might be using the root user to access the database, which might not be the best practice for security reasons.

- **DATABASE_PASSWORD**: This variable stores the password for the MySQL database user specified in `DATABASE_USER`. The value `12345678` is a placeholder; in a real-world scenario, you would use a strong, secure password.

- **DATABASE_NAME**: This is the name of the MySQL database that the application is connecting to. In this case, it's set to `app`.

## Developer mode

Once the dependencies are installed, you can start the application using the following command:

```sh
pnpm dev
```

Visit the appropriate URL in your web browser to access the running application `http://localhost:3000`.
Visit the appropriate URL in your web browser to access Swagger Docs `http://localhost:3001/docs`.

## Production mode

Once the dependencies are installed, you can start the application using the following command:

```sh
pnpm start
```

Visit the appropriate URL in your web browser to access the running application `http://localhost:3000`.
Visit the appropriate URL in your web browser to access Swagger Docs `http://localhost:3001/docs`.
You can use Nginx reverse proxy for the backend and frontend.
