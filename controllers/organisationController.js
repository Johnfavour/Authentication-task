const { Organisation, User } = require('../models');

exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await req.user.getOrganisations();
    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: { organisations }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrganisation = async (req, res) => {
  const { orgId } = req.params;
  try {
    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }
    const users = await organisation.getUsers();
    if (!users.map(user => user.userId).includes(req.user.userId)) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: organisation
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(422).json({ errors: [{ field: 'name', message: 'Name is required' }] });
  }
  try {
    const organisation = await Organisation.create({ name, description });
    await req.user.addOrganisation(organisation);
    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: organisation
    });
  } catch (err) {
    res.status(400).json({ status: 'Bad request', message: 'Client error', statusCode: 400});
  }
};

exports.addUserToOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { userId } = req.body;

  try {
    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await organisation.addUser(user);
    res.status(200).json({ message: 'User added to organisation successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
