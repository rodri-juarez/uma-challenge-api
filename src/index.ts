import 'dotenv/config';

import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import {calendarRouter} from './routes/calendar';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(limiter)
app.use('/calendar', calendarRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
