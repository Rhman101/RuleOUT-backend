"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
// const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'chatApp.db',
    logging: false,
    define: {
        freezeTableName: true
    }
});
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('SQLite and Sequelize running');
    }
    catch (error) {
        console.error('Error:', error);
    }
});
test();
const Person = sequelize.define('Person', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
});
const PersonTokens = sequelize.define('PersonTokens', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    personId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
});
const Activity = sequelize.define('Activity', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        unique: true
    }
});
const Grade = sequelize.define('Grade', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        unique: true
    }
});
const Attempt = sequelize.define('Attempt', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    personId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    activityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    gradeId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
});
const init = (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync({ alter: true });
    done();
});
// export default { init, User, Message, Contact, Group, GroupMembership, sequelize };
exports.default = { init, Person, PersonTokens, Activity, Grade, Attempt, sequelize };
//# sourceMappingURL=db.js.map