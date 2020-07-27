import * as express from 'express';

const app = express();
const cors = require('cors')({ origin: true });
app.use(cors)

import { Vendors } from '../db/schema';

app.get('/', async (req, res) => {
  const result = await Vendors.getAll();

  res.json(result);
});

app.get('/:id', async (req, res) => {
  const result = await Vendors.get(req.params.id);

  res.json(result);
});

app.put('/:id', async (req, res) => {   
  const result = await Vendors.update(req.params.id, req.body);

  res.json(result);
});

app.post('/', async (req, res) => {
  const result = await Vendors.create(req.body);

  res.json(result);  
});

app.delete('/:id', async (req, res) => {
  const result = Vendors.delete(req.params.id);

  res.json(result);
});

export default app;
