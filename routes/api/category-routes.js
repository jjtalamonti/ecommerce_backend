const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body)
    res.status(200).json(newCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const catDataUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catDataUpdate) {
      res.status(404).json({ message: "No category has that ID" });
      return;
    }
    res.status(200).json(catDataUpdate)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCat) {
      res.status(404).json({ message: "No category has that ID" });
      return;
    }
    res.status(200).json(catDataUpdate)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
