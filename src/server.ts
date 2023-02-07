import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import busboy from 'connect-busboy';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import { parseFormData } from './handlers/formdata';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('get to /');
  res.status(200);
  res.json({ message: req.secret });
});

// protected part
app.use('/api', protect, router);

// exposed part
app.post('/user', createNewUser);
app.post('/signin', signin);

/**
 * FormData
 * TODO: remove me please
 */
// https://medium.com/@vecera.petr/how-to-handle-large-file-upload-with-nodejs-express-server-7de9ab3f7af1
app.use(busboy());

app.post('/formdata', parseFormData);

export default app;
