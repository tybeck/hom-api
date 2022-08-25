# Infrastructure

- Frontend
  - Web, iOS, Android and Desktop 
- Backend
- Serverless Functions
  - Jobs 
- Mongo
  - Persistence layer 
- Redis
  - Storing tokens
  - Job Queue
- BullMQ
  - Job Queue Distribution

## Running the stack
- `redis-server`
- `mongod --dbpath ./data/db/`
- `yarn web` / `yarn ios` / `yarn android` for UI
- `yarn start:dev` for API
- `ngrok http 3000 --subdomain tbeck` for FE/BE tunnel
- `ngrok tcp 27017` for mongo tunnel