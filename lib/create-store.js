const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const basename = path.basename(module.filename);

const createStore = ({
  env = process.env.NODE_ENV || 'development',
  configFile = path.join(process.cwd() + 'config.json'),
  modelsDir = path.join(process.cwd(), 'models')
}) => {
  const config = require(configFile)[env];

  let sequelize = null;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  const db = { sequelize, Sequelize: sequelize };

  fs.readdirSync(modelsDir).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
    const model = sequelize['import'](path.join(modelsDir, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

module.exports = createStore;