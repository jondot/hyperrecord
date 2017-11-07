const Sequelize = require('sequelize')
const { init } = require('../../index')
module.exports = (sequelize, DataTypes) => {
  @init({ sequelize })
  class Artifact extends Sequelize.Model {
    static schema = {
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
    }

    static hooks = {
      beforeCreate: 'makePid'
    }

    static makePid(rec) {
      rec.pid = 'should-be-set'
    }

    static associate(/* { Project, User }*/) {
      /*
      Artifact.belongsTo(Project, { foreignKey: 'projectId' })
      Artifact.belongsTo(User, { foreignKey: 'userId' })
      */
    }
  }

  return Artifact
}
