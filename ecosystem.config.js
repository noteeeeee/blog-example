module.exports = {
  apps: [
    {
      name: "app-client",
      script: "./.output/server/index.mjs",
      cwd: "./apps/client",
    },
    {
      name: "app-server",
      script: "./dist/main.js",
      cwd: "./apps/server",
    },
  ],
};
