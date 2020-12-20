module.exports = {
  apps: [
    {
      name: "city",
      script: "./server/server.js",
      instances: 0,
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: "8085",
      },
    },
  ],
};
