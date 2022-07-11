import db from './db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const sequelize = db.sequelize;

const Person = db.Person;
const PersonTokens = db.PersonTokens;
const Attempt = db.Attempt;
const Grade = db.Grade;
const Activity = db.Activity;

export const wipeUserData = async () => {
    await sequelize.query('DELETE FROM Person');
    await sequelize.query('DELETE FROM Attempt');
    await sequelize.query('DELETE FROM PersonTokens');
};

const createPerson = async (name: string, email: string, password: string) => {
    try {
        const bcryptPassword = await bcrypt.hash(password, 10);
        const newPerson = await Person.create({
            name,
            email,
            password: bcryptPassword
        })
        return newPerson;
    } catch (e) {
        console.log('ERROR IN queries.createPerson');
        console.log('name email', name, email);
        console.log(e);
    }
}

const generatePersonAuthToken = async (personId: number) => {
    try {
        const person: any = await Person.findByPk(personId);
        const token: string = jwt.sign({
            _id: person.id.toString(),
            email: person.email
        }, process.env.JWT_SECRET);
        await PersonTokens.create({ personId: person.id, token });
        return token;
    } catch (e) {
        console.log('ERROR IN queries.generatePersonAuthToken');
        console.log('personId', personId);
        console.log(e);
    }
}

export const createAndLoginPerson = async (name: string, email: string, password: string) => {
    try {
        const person: any = await createPerson(name, email, password);
        const token = await generatePersonAuthToken(person.id);
        return {
            name: person.name,
            email: person.email,
            token
        }
    } catch (e) {
        console.log('ERROR IN queries.createAndLoginPerson');
        console.log('name email', name, email);
        console.log(e);
        return { error: 'Review data and try again.' }
    }
}

export const loginPerson = async (email: string, password: string) => {
    try {
        const person: any = await Person.findOne({ where: { email } });
        const isMatch = await bcrypt.compare(password, person.password);
        if (isMatch) {
            const token = await generatePersonAuthToken(person.id);
            return {
                id: person.id,
                name: person.name,
                email: person.email,
                token
            }
        } else {
            return {
                error: "email and password do not match"
            }
        }
    } catch (e) {
        console.log('ERROR IN queries.loginPerson');
        console.log('email password', email, password);
        console.log(e);
        return { error: 'Review data and try again.' }
    }
}

export const logoutPerson = async (token: string) => {
    try {
        PersonTokens.destroy({
            where: {
                token
            }
        })
        return { loggedOut: true }
    } catch (e) {
        console.log('ERROR IN queries.logoutPerson');
        console.log('token', token);
        console.log(e);
        return { error: 'Review data and try again.' }
    }
}

export const createActivity = async (name: string) => {
    try {
        const activity = await Activity.create({ name })
        return activity;
    } catch (e) {
        if (!(e.errors[0].validatorKey === 'not_unique')) {
            console.log('ERROR IN queries.createActivity');
            console.log('name email', name);
            console.log(e);
        }
    }
}

export const createCompletedAttempt = async (
    gradeName: string,
    personEmail: string,
    activityName: string
) => {
    try {
        const person: any = await Person.findOne({ where: { email: personEmail } });
        const activity: any = await Activity.findOne({ where: { name: activityName } });
        const grade: any = await Grade.findOne({ where: { name: gradeName } });
        const attempt = await Attempt.create({
            personId: person.id,
            activityId: activity.id,
            gradeId: grade.id,
            completed: true
        });
        return attempt;
    } catch (e) {
        console.log('ERROR IN queries.createCompletedAttempt');
        console.log('name email', { gradeName, personEmail, activityName });
        console.log(e);
    }
}

export const createGrade = async (name: string) => {
    try {
        const grade = await Grade.create({ name });
        return grade;
    } catch (e) {
        if (!(e.errors[0].validatorKey === 'not_unique')) {
            console.log('ERROR IN queries.createGrade');
            console.log('name', name);
            console.log(e);
        }
    }
}

export const getAllAttempts = async (id: number) => {
    try {
        const attempts: any = await Attempt.findAll({
            where: {
                personId: id
            },
        })
        const newAttempts = [];
        for (const attempt of attempts) {
            const name: any = await Activity.findOne({
                where: {
                    id: attempt.activityId
                }
            })
            const gradeName: any = await Grade.findOne({
                where: {
                    id: attempt.gradeId
                }
            })
            const result = attempt.dataValues;
            newAttempts.push({ name: name.name, gradeName: gradeName.name })
        }
        return newAttempts;
    } catch (e) {
        console.log('ERROR IN queries.getAllAttempts');
        console.log('name email', { id });
        console.log(e);
    }
}
