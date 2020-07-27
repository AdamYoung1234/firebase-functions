import * as express from 'express';

const app = express();

import { Vendors } from '../db/schema';

app.get('/', async (req, res) => {
  const test = await Vendors.getAll();

  res.json(test);
});

app.get('/:id', async (req, res) => {
  const test = await Vendors.get(req.params.id);

  res.json(test);
});

app.put('/:id', async (req, res) => {   
  const test = await Vendors.update(req.params.id, req.body);

  res.json(test);
});

app.post('/', async (req, res) => {
  const test = await Vendors.create(req.body);

  res.json(test);  
});

app.delete('/:id', async (req, res) => {
  const result = Vendors.delete(req.params.id);

  res.json(result);
});

export default app;
