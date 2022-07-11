import jwt from 'jsonwebtoken';
import db from '../controllers/db';

const Person = db.Person;
const PersonTokens = db.PersonTokens;

const auth = async (
    req: any,
    res: any,
    next: () => void
) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const tokenInDB: any = await PersonTokens.findOne({ where: { token } });
        const person: any = await Person.findByPk(Number(tokenInDB.personId));
        if (!person) {
            throw new Error();
        }
        req.token = token;
        req.person = person;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

export default auth;