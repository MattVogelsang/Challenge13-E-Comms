const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with their associated Products
// http://localhost:3001/api/tags/
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products', // Use the alias if set in associations
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by its `id` with associated Products
// http://localhost:3001/api/tags/1
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          // 
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new tag
// http://localhost:3001/api/tags/
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a tag's name by its `id`
// http://localhost:3001/api/tags/1
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by its `id`
// http://localhost:3001/api/tags/1
router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
