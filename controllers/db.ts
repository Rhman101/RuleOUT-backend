/* eslint-disable @typescript-eslint/naming-convention */
// const { Sequelize, DataTypes, Model } = require('sequelize');
import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'chatApp.db',
  logging: false,
  define: {
    freezeTableName: true
  }
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite and Sequelize running');
  } catch (error) {
    console.error('Error:', error);
  }
};
test();

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

const PersonTokens = sequelize.define('PersonTokens', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  personId: {
    type: DataTypes.INTEGER
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
})

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    unique: true
  }
})

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    unique: true
  }
})

const Attempt = sequelize.define('Attempt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  personId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gradeId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

const init = async (done: () => void) => {
  await sequelize.sync({ alter: true });
  done();
};

// export default { init, User, Message, Contact, Group, GroupMembership, sequelize };
export default { init, Person, PersonTokens, Activity, Grade, Attempt, sequelize };
