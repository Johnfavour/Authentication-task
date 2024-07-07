const express = require('express');
const auth = require('../middleware/auth');
const { getAllOrganisations, getOrganisation, createOrganisation, addUserToOrganisation } = require('../controllers/organisationController');

const router = express.Router();

router.get('/', auth, getAllOrganisations);
router.get('/:orgId', auth, getOrganisation);
router.post('/', auth, createOrganisation);
router.post('/:orgId/users', auth, addUserToOrganisation);

module.exports = router;
