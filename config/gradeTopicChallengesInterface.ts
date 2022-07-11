export interface Args {
    integerInputs?: number[],
    grade?: number
    withInteger?: boolean,
    range?: number[],
    numberIntegers?: number,
    additionRange?: number[],
    multiplicationRange?: number[],
    divisionRange?: number[],
    leadingCoefficient?: boolean
}

export interface Settings {
    secondsStageTwo: number
    secondsStageThree: number
    questionsStageThree: number
    inRowCorrectStageOne: number
    inRowCorrectStageTwo: number
    instructions: string
}

export interface Challenge {
    name: string
    generatorName: string
    args: Args
    settings: Settings
}

export interface GradeTopicChallenges {
    name: string,
    gradeDigit: string,
    topics: Topics[]
}

export interface Topics {
    topicName: string,
    challenges: Challenge[]
}

export const initialChallenge: Challenge =  {
    name: '',
    generatorName: '',
    args: {},
    settings: {
        secondsStageTwo: -1,
        secondsStageThree: -1,
        questionsStageThree: -1,
        inRowCorrectStageOne: -1,
        inRowCorrectStageTwo: -1,
        instructions: ''
    }
}