module.exports = (sequelize, DataTypes) => {
    const Organisation = sequelize.define('Organisation', {
      orgId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING
    });
  
    Organisation.associate = function(models) {
      Organisation.belongsToMany(models.User, {
        through: 'UserOrganisation',
        as: 'users',
        foreignKey: 'orgId'
      });
    };
  
    return Organisation;
  };
  