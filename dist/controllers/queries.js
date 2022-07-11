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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAttempts = exports.createGrade = exports.createCompletedAttempt = exports.createActivity = exports.logoutPerson = exports.loginPerson = exports.createAndLoginPerson = exports.wipeUserData = void 0;
const db_1 = __importDefault(require("./db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize = db_1.default.sequelize;
const Person = db_1.default.Person;
const PersonTokens = db_1.default.PersonTokens;
const Attempt = db_1.default.Attempt;
const Grade = db_1.default.Grade;
const Activity = db_1.default.Activity;
const wipeUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.query('DELETE FROM Person');
    yield sequelize.query('DELETE FROM Attempt');
    yield sequelize.query('DELETE FROM PersonTokens');
});
exports.wipeUserData = wipeUserData;
const createPerson = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bcryptPassword = yield bcrypt_1.default.hash(password, 10);
        const newPerson = yield Person.create({
            name,
            email,
            password: bcryptPassword
        });
        return newPerson;
    }
    catch (e) {
        console.log('ERROR IN queries.createPerson');
        console.log('name email', name, email);
        console.log(e);
    }
});
const generatePersonAuthToken = (personId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield Person.findByPk(personId);
        const token = jsonwebtoken_1.default.sign({
            _id: person.id.toString(),
            email: person.email
        }, process.env.JWT_SECRET);
        yield PersonTokens.create({ personId: person.id, token });
        return token;
    }
    catch (e) {
        console.log('ERROR IN queries.generatePersonAuthToken');
        console.log('personId', personId);
        console.log(e);
    }
});
const createAndLoginPerson = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield createPerson(name, email, password);
        const token = yield generatePersonAuthToken(person.id);
        return {
            name: person.name,
            email: person.email,
            token
        };
    }
    catch (e) {
        console.log('ERROR IN queries.createAndLoginPerson');
        console.log('name email', name, email);
        console.log(e);
        return { error: 'Review data and try again.' };
    }
});
exports.createAndLoginPerson = createAndLoginPerson;
const loginPerson = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield Person.findOne({ where: { email } });
        const isMatch = yield bcrypt_1.default.compare(password, person.password);
        if (isMatch) {
            const token = yield generatePersonAuthToken(person.id);
            return {
                id: person.id,
                name: person.name,
                email: person.email,
                token
            };
        }
        else {
            return {
                error: "email and password do not match"
            };
        }
    }
    catch (e) {
        console.log('ERROR IN queries.loginPerson');
        console.log('email password', email, password);
        console.log(e);
        return { error: 'Review data and try again.' };
    }
});
exports.loginPerson = loginPerson;
const logoutPerson = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        PersonTokens.destroy({
            where: {
                token
            }
        });
        return { loggedOut: true };
    }
    catch (e) {
        console.log('ERROR IN queries.logoutPerson');
        console.log('token', token);
        console.log(e);
        return { error: 'Review data and try again.' };
    }
});
exports.logoutPerson = logoutPerson;
const createActivity = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield Activity.create({ name });
        return activity;
    }
    catch (e) {
        if (!(e.errors[0].validatorKey === 'not_unique')) {
            console.log('ERROR IN queries.createActivity');
            console.log('name email', name);
            console.log(e);
        }
    }
});
exports.createActivity = createActivity;
const createCompletedAttempt = (gradeName, personEmail, activityName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield Person.findOne({ where: { email: personEmail } });
        const activity = yield Activity.findOne({ where: { name: activityName } });
        const grade = yield Grade.findOne({ where: { name: gradeName } });
        const attempt = yield Attempt.create({
            personId: person.id,
            activityId: activity.id,
            gradeId: grade.id,
            completed: true
        });
        return attempt;
    }
    catch (e) {
        console.log('ERROR IN queries.createCompletedAttempt');
        console.log('name email', { gradeName, personEmail, activityName });
        console.log(e);
    }
});
exports.createCompletedAttempt = createCompletedAttempt;
const createGrade = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grade = yield Grade.create({ name });
        return grade;
    }
    catch (e) {
        if (!(e.errors[0].validatorKey === 'not_unique')) {
            console.log('ERROR IN queries.createGrade');
            console.log('name', name);
            console.log(e);
        }
    }
});
exports.createGrade = createGrade;
const getAllAttempts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attempts = yield Attempt.findAll({
            where: {
                personId: id
            },
        });
        const newAttempts = [];
        for (const attempt of attempts) {
            const name = yield Activity.findOne({
                where: {
                    id: attempt.activityId
                }
            });
            const gradeName = yield Grade.findOne({
                where: {
                    id: attempt.gradeId
                }
            });
            const result = attempt.dataValues;
            newAttempts.push({ name: name.name, gradeName: gradeName.name });
        }
        return newAttempts;
    }
    catch (e) {
        console.log('ERROR IN queries.getAllAttempts');
        console.log('name email', { id });
        console.log(e);
    }
});
exports.getAllAttempts = getAllAttempts;
//# sourceMappingURL=queries.js.map