const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const path = require('path')
const makeArtifact = require('../fixtures/models/artifact')
describe('foobanzle', () => {
  it('model integrated', async () => {
    const s = new Sequelize('sqlite://:memory:')
    const Artifact = makeArtifact(s, DataTypes)
    await s.sync()
    const a = await Artifact.create({ kind: 'foobar' })
    expect(a.pid).toEqual('should-be-set')
  })
  it('createStore: loads the correct environment and config file', async () => {
    const create = require('../create-store')
    const db = create({
      env: 'development',
      configFile: path.join(__dirname, '../fixtures/config.json'),
      modelsDir: path.join(__dirname, '../fixtures/models')
    })
    expect(db.sequelize.options.dialect).toEqual('sqlite')
  })
})
