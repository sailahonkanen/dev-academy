import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const data = fs.readFileSync('names.json');
const namesList = JSON.parse(data);

const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('client/build'));

router.get('/', (req, res) => {
  const names = namesList.names;

  res.send(names);
});

app.use('/names', router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
