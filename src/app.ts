import express from 'express';
import { UsersController } from './controllers/userController';

const app = express();

app.get('/users', UsersController.findAll);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});