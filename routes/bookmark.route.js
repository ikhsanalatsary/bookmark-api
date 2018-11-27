'use strict';

const { Router } = require('express');
const { create, deletes, index, patch, show, update } = require('../controller/bookmark.controller');

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id', patch);
router.delete('/:id', deletes);

module.exports = router;
