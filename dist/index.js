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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./controllers/db"));
const gradeTopicChallenges_1 = __importDefault(require("./config/gradeTopicChallenges"));
const queries_1 = require("./controllers/queries");
const auth_1 = __importDefault(require("./middleware/auth"));
const server = new http_1.default.Server(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize db
db_1.default.init(() => __awaiter(void 0, void 0, void 0, function* () {
    // Load grades and activities
    for (const grade of gradeTopicChallenges_1.default) {
        yield (0, queries_1.createGrade)(grade.name);
        for (const topics of grade.topics) {
            for (const challenge of topics.challenges) {
                yield (0, queries_1.createActivity)(challenge.name);
            }
        }
    }
    if (process.env.ENVIRONMENT === 'DEV') {
        yield (0, queries_1.wipeUserData)();
        yield (0, queries_1.createAndLoginPerson)('Ruan Huysen', 'rhuysen@gmail.com', '.86Lepos3');
        yield (0, queries_1.logoutPerson)('rhuysen@gmail.com');
        yield (0, queries_1.createCompletedAttempt)('Grade 9', 'rhuysen@gmail.com', 'Basic Integers');
        yield (0, queries_1.createCompletedAttempt)('Grade 12', 'rhuysen@gmail.com', 'Basic Power rule');
        console.log('Test database init complete');
    }
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ thisThing: 'Is working' });
    }
    catch (e) {
        console.log(e);
    }
}));
// Creates a new user and logs them in.
app.post('/person', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send();
        }
        const person = yield (0, queries_1.createAndLoginPerson)(name, email, password);
        if (person.error) {
            res.status(400).send();
        }
        res.status(200).send(person);
    }
    catch (e) {
        console.log('ERROR in index.post:/person');
        console.log(e);
        res.status(400).send();
    }
}));
// Log in user.
app.post('/person/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, queries_1.loginPerson)(req.body.email, req.body.password);
        if (person.error && !person.id) {
            return res.status(400).send({ error: person.error });
        }
        const completedActivities = yield (0, queries_1.getAllAttempts)(person.id);
        res.status(200).send({
            name: person.name,
            email: person.email,
            token: person.token,
            completedActivities
        });
    }
    catch (e) {
        console.log('ERROR in index.post:/person/login');
        console.log(e);
        res.status(400).send();
    }
}));
// Logs out user
app.post('/person/logout', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, queries_1.logoutPerson)(req.header('Authorization').replace('Bearer ', ''));
        res.status(200).send();
    }
    catch (e) {
        console.log('ERROR in index.post:/person/logout');
        console.log(e);
        res.status(400).send();
    }
}));
// Posts completed activity - get all completed activities in response
app.post('/activity', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gradeName = req.body.gradeName;
        const email = req.body.email;
        const activityName = req.body.activityName;
        if (!gradeName || !email || !activityName) {
            return res.status(400).send();
        }
        yield (0, queries_1.createCompletedAttempt)(gradeName, email, activityName);
        const attempts = yield (0, queries_1.getAllAttempts)(req.person.id);
        res.status(200).send(attempts);
    }
    catch (e) {
        console.log('data is wrong second]', { body: req.body });
        console.log('ERROR in index.post:/activity');
        console.log(e);
        res.status(400).send();
    }
}));
// Gets all completed activities
app.get('/activity', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, queries_1.getAllAttempts)(req.person.id);
        res.status(200).send(response);
    }
    catch (e) {
        console.log('ERROR in index.get:/activity');
        console.log(e);
        res.status(404).send();
    }
}));
server.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Listening on ' + process.env.PORT);
}));
//# sourceMappingURL=index.js.map