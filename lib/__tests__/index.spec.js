function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const path = require('path');
const makeArtifact = require('../fixtures/models/artifact');
describe('foobanzle', () => {
  it('model integrated', _asyncToGenerator(function* () {
    const s = new Sequelize('sqlite://:memory:');
    const Artifact = makeArtifact(s, DataTypes);
    yield s.sync();
    const a = yield Artifact.create({ kind: 'foobar' });
    expect(a.pid).toEqual('should-be-set');
  }));
  it('createStore: loads the correct environment and config file', _asyncToGenerator(function* () {
    const create = require('../create-store');
    const db = create({
      env: 'development',
      configFile: path.join(__dirname, '../fixtures/config.json'),
      modelsDir: path.join(__dirname, '../fixtures/models')
    });
    expect(db.sequelize.options.dialect).toEqual('sqlite');
  }));
});