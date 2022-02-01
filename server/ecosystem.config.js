module.exports = {
  // applications part
  apps: [
    {
      name: "test-chat",
      script: "./src/server.js",
      instances: "1",
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: process.env.API_PORT,
      },
    },
    {
      name: "test-chat 1",
      script: "./src/server.js",
      instances: "1",
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: process.env.API_PORT1,
      },
    },
  ],
};
