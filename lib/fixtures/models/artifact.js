const Sequelize = require('sequelize');
const { init } = require('../../index');
module.exports = (sequelize, DataTypes) => {
  var _dec, _class, _class2, _temp;

  let Artifact = (_dec = init({ sequelize }), _dec(_class = (_temp = _class2 = class Artifact extends Sequelize.Model {

    static makePid(rec) {
      rec.pid = 'should-be-set';
    }

    static associate() /* { Project, User }*/{
      /*
      Artifact.belongsTo(Project, { foreignKey: 'projectId' })
      Artifact.belongsTo(User, { foreignKey: 'userId' })
      */
    }
  }, _class2.schema = {
    kind: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    pid: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, _class2.hooks = {
    beforeCreate: 'makePid'
  }, _temp)) || _class);


  return Artifact;
};