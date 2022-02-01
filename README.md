# node-react-chat

chat application built using node, react, socket, redis

# pre-requisites

- nodejs 15 >=
- install redis on your local
- pm2 to run server

# installation and running

- git clone git@github.com:navinmishra1717/node-react-chat.git && cd <repo_name>
  #run server
- cd server
- npm install
- NODE_PORT=8083 node src/server.js
- ./run.sh :- for runnig on multiple ports
  #run client
- cd client
- npm install
- run -> touch .env AND paste REACT_APP_API_URL=http://localhost:8083/
- npm start
