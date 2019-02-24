const express = require('express');
const router = express.Router();
const { Jump } = require('../sequelize');

router.get(`/:id`, async (req, res) => {
  const jump = await Jump.findById(req.params.id);
  if (!jump) {
    return res.status(404).send('Test with submitted ID not found');
  }
  res.send(jump);
});

router.post(`/`, async (req, res) => {
  try {
    const jump = await Jump.create({ data: req.body.data });
    res.send(jump);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put(`/:id`, async (req, res) => {
  const jump = await Jump.findById(req.params.id);
  if (!jump) {
    return res.status(404).send('Test with submitted ID not found');
  }
  try {
    const updated_jump = await jump.update({ data: req.body.data });
    res.send(updated_jump);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete(`/:id`, async (req, res) => {
  const jump = await Jump.findById(req.params.id);
  if (!jump) {
    return res.status(404).send('Test with submitted ID not found');
  }
  await jump.destroy();
  res.send(jump);
});

module.exports = router;
