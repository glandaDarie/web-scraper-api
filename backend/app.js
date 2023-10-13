import express from 'express';
import webScrapperRoutes from './routes/webScrapperRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/scrape', webScrapperRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
