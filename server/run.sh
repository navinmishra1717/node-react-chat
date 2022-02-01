#!/usr/bin/bash
NODE_PORT=8080 pm2 start src/server.js -f
NODE_PORT=8081 pm2 start src/server.js -f