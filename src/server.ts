import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // res.status(401);
  // res.send('operation is not allowed');
  req.secret = 'secret information';
  next();
});

app.get('/', (req, res) => {
  console.log('get to /');
  res.status(200);
  res.json({ message: req.secret });
});

app.use('/api', router);

export default app;
