const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Items');

/**
 * @route GET api/items
 * @desc Get all Items
 * @access Private
 */
router.get('/', auth, (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => {
            res.json(items);
            console.log('GET items',  items);
        });
});
/**
 * @route POST api/items
 * @desc Add new item
 * @access Private
 */
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then((item) => {
            res.json(item)
        });
});

/**
 * @route DELETE api/items:id
 * @desc Delete an item
 * @access Private
 */
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
