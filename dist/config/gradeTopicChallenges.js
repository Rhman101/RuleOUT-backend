"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gradeTopicChallenges = [
    // {SW
    //     name: "Grade 1",
    //     topics: []
    // },
    // {
    //     name: "Grade 2",
    //     topics: []
    // },
    // {Y
    //     name: "Grade 3",
    //     topics: []
    // },
    // {
    //     name: "Grade 4",
    //     topics: []
    // },
    // {
    //     name: "Grade 5",
    //     topics: []
    // },
    // {
    //     name: "Grade 6",
    //     topics: []
    // },
    {
        name: "Grade 7",
        gradeDigit: '7',
        topics: [
            {
                topicName: "Integers",
                challenges: [
                    {
                        name: "Addition",
                        generatorName: 'addIntegers',
                        args: {
                            grade: 7
                        },
                        settings: {
                            secondsStageTwo: 12,
                            secondsStageThree: 10,
                            questionsStageThree: 50,
                            inRowCorrectStageOne: 10,
                            inRowCorrectStageTwo: 15,
                            instructions: ''
                        }
                    },
                    {
                        name: "Subtraction",
                        generatorName: 'subtractIntegers',
                        args: {
                            grade: 7
                        },
                        settings: {
                            secondsStageTwo: 15,
                            secondsStageThree: 12,
                            questionsStageThree: 50,
                            inRowCorrectStageOne: 10,
                            inRowCorrectStageTwo: 15,
                            instructions: ''
                        }
                    },
                    {
                        name: "Multiplication",
                        generatorName: "multiplyIntegers",
                        args: {
                            integerInputs: [2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12],
                        },
                        settings: {
                            secondsStageTwo: 15,
                            secondsStageThree: 12,
                            questionsStageThree: 50,
                            inRowCorrectStageOne: 9,
                            inRowCorrectStageTwo: 12,
                            instructions: ''
                        }
                    },
                    {
                        name: "Basic Integers",
                        generatorName: "addBasicIntegers",
                        args: {
                            range: [-12, 12],
                            numberIntegers: 3
                        },
                        settings: {
                            secondsStageTwo: 30,
                            secondsStageThree: 20,
                            questionsStageThree: 30,
                            inRowCorrectStageOne: 7,
                            inRowCorrectStageTwo: 10,
                            instructions: ''
                        }
                    }
                ]
            },
            {
                topicName: "Fractions",
                challenges: [
                    {
                        name: "Add Simple Fractions",
                        generatorName: 'addFractions',
                        args: {},
                        settings: {
                            secondsStageTwo: 120,
                            secondsStageThree: 80,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'To type the mixed number answer, type the number, followed by a space, followed by a fraction delineated with the / key'
                        }
                    },
                    {
                        name: "Subtract Simple Fractions",
                        generatorName: 'subtractFractions',
                        args: {},
                        settings: {
                            secondsStageTwo: 120,
                            secondsStageThree: 80,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'To type the mixed number answer, type the number, followed by a space, followed by a fraction delineated with the / key'
                        }
                    }, {
                        name: "Multiply Simple Fractions",
                        generatorName: 'multiplyFractions',
                        args: {},
                        settings: {
                            secondsStageTwo: 100,
                            secondsStageThree: 80,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'To type the mixed number answer, type the number, followed by a space, followed by a fraction delineated with the / key'
                        }
                    }, {
                        name: "Divide Simple Fractions",
                        generatorName: 'divideFractions',
                        args: {},
                        settings: {
                            secondsStageTwo: 120,
                            secondsStageThree: 90,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'To type the mixed number answer, type the number, followed by a space, followed by a fraction delineated with the / key'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: "Grade 8",
        gradeDigit: '8',
        topics: [
            {
                topicName: "Integers",
                challenges: [
                    {
                        name: "Basic Integers",
                        generatorName: "addBasicIntegers",
                        args: {
                            range: [-15, 15],
                            numberIntegers: 4
                        },
                        settings: {
                            secondsStageTwo: 30,
                            secondsStageThree: 20,
                            questionsStageThree: 20,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: ''
                        }
                    },
                    {
                        name: "Multiply Integers",
                        generatorName: "multiplyIntegers",
                        args: {
                            integerInputs: [
                                2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12,
                                -2, -3, -4, -4, -5, -5, -6, -6, -6, -7, -7, -7, -8, -8, -8, -9, -9, -9, -10, -11, -11, -12, -12, -12
                            ]
                        },
                        settings: {
                            secondsStageTwo: 10,
                            secondsStageThree: 8,
                            questionsStageThree: 40,
                            inRowCorrectStageOne: 8,
                            inRowCorrectStageTwo: 10,
                            instructions: ''
                        }
                    }
                ]
            },
            {
                topicName: "Algebraic Equations",
                challenges: [
                    {
                        name: "One-step Equations",
                        generatorName: 'oneStepEquations',
                        args: {
                            additionRange: [-15, 15],
                            multiplicationRange: [-15, 15],
                            divisionRange: [-12, 12]
                        },
                        settings: {
                            secondsStageTwo: 30,
                            secondsStageThree: 25,
                            questionsStageThree: 30,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'Where a fraction is the answer, leave the answer as an improper fraction.'
                        }
                    }, {
                        name: "Multi-step Equations",
                        generatorName: 'multiStepEquations',
                        args: {
                            range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                        },
                        settings: {
                            secondsStageTwo: 35,
                            secondsStageThree: 28,
                            questionsStageThree: 25,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'Where a fraction is the answer, leave the answer as an improper fraction.'
                        }
                    }
                ]
            },
            {
                topicName: "Algebraic Expressions",
                challenges: [
                    {
                        name: "Factorize Difference of Squares",
                        generatorName: 'factorizeDiffOfSq',
                        args: {
                            withInteger: false
                        },
                        settings: {
                            secondsStageTwo: 70,
                            secondsStageThree: 60,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 8,
                            instructions: ''
                        }
                    }, {
                        name: "Factorize Quadratics Level 1",
                        generatorName: 'factorizeQuadratics',
                        args: {
                            leadingCoefficient: false
                        },
                        settings: {
                            secondsStageTwo: 180,
                            secondsStageThree: 120,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'PS: If the answer is a binomial squared, type the binomail twice. Type (x+1)(x+1) instead of (x+1)^2.'
                        }
                    }, {
                        name: "Factorize Quadratics Level 2",
                        generatorName: 'factorizeQuadratics',
                        args: {
                            leadingCoefficient: true
                        },
                        settings: {
                            secondsStageTwo: 360,
                            secondsStageThree: 240,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 6,
                            instructions: 'PS: If the answer is a binomial squared, type the binomail twice. Type (x+1)(x+1) instead of (x+1)^2.'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: "Grade 9",
        gradeDigit: '9',
        topics: [
            {
                topicName: "Integers",
                challenges: [
                    {
                        name: "Basic Integers",
                        generatorName: "addBasicIntegers",
                        args: {
                            range: [-15, 15],
                            numberIntegers: 4
                        },
                        settings: {
                            secondsStageTwo: 20,
                            secondsStageThree: 15,
                            questionsStageThree: 20,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 8,
                            instructions: ''
                        }
                    },
                    {
                        name: "Multiply Integers",
                        generatorName: "multiplyIntegers",
                        args: {
                            integerInputs: [
                                2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12,
                                -2, -3, -4, -4, -5, -5, -6, -6, -6, -7, -7, -7, -8, -8, -8, -9, -9, -9, -10, -11, -11, -12, -12, -12
                            ]
                        },
                        settings: {
                            secondsStageTwo: 12,
                            secondsStageThree: 10,
                            questionsStageThree: 30,
                            inRowCorrectStageOne: 10,
                            inRowCorrectStageTwo: 12,
                            instructions: ''
                        }
                    }
                ]
            },
            {
                topicName: "Algebraic Expressions",
                challenges: [
                    {
                        name: "Factorize Difference of Squares",
                        generatorName: 'factorizeDiffOfSq',
                        args: {
                            withInteger: true
                        },
                        settings: {
                            secondsStageTwo: 100,
                            secondsStageThree: 80,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 5,
                            instructions: ''
                        }
                    }, {
                        name: "Factorize Quadratics Level 1",
                        generatorName: 'factorizeQuadratics',
                        args: {
                            leadingCoefficient: false
                        },
                        settings: {
                            secondsStageTwo: 360,
                            secondsStageThree: 280,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 5,
                            instructions: 'PS: If the answer is a binomial squared, type the binomail twice. Type (x+1)(x+1) instead of (x+1)^2.'
                        }
                    }, {
                        name: "Factorize Quadratics Level 2",
                        generatorName: 'factorizeQuadratics',
                        args: {
                            leadingCoefficient: true
                        },
                        settings: {
                            secondsStageTwo: 400,
                            secondsStageThree: 320,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 5,
                            instructions: 'PS: If the answer is a binomial squared, type the binomail twice. Type (x+1)(x+1) instead of (x+1)^2.'
                        }
                    }
                ]
            },
            {
                topicName: "Algebraic Equations",
                challenges: [
                    {
                        name: "One-step Equations",
                        generatorName: 'oneStepEquations',
                        args: {
                            additionRange: [-15, 15],
                            multiplicationRange: [-15, 15],
                            divisionRange: [-12, 12]
                        },
                        settings: {
                            secondsStageTwo: 25,
                            secondsStageThree: 20,
                            questionsStageThree: 25,
                            inRowCorrectStageOne: 10,
                            inRowCorrectStageTwo: 12,
                            instructions: 'If a fraction is the answer, leave it as an improper fraction'
                        }
                    }, {
                        name: "Multi-step Equations",
                        generatorName: 'multiStepEquations',
                        args: {
                            range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                        },
                        settings: {
                            secondsStageTwo: 25,
                            secondsStageThree: 30,
                            questionsStageThree: 25,
                            inRowCorrectStageOne: 6,
                            inRowCorrectStageTwo: 8,
                            instructions: 'Where a fraction is the answer, leave the answer as an improper fraction.'
                        }
                    }
                ]
            }
        ]
    }, {
        name: "Grade 12",
        gradeDigit: '12',
        topics: [
            {
                topicName: "Calculus",
                challenges: [
                    {
                        name: "Basic Power rule",
                        generatorName: 'basicPowerRule',
                        args: {},
                        settings: {
                            secondsStageTwo: 60,
                            secondsStageThree: 50,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 8,
                            instructions: ''
                        }
                    }, {
                        name: "Gradient from Derivative",
                        generatorName: 'mFromDerivative',
                        args: {},
                        settings: {
                            secondsStageTwo: 60,
                            secondsStageThree: 50,
                            questionsStageThree: 15,
                            inRowCorrectStageOne: 5,
                            inRowCorrectStageTwo: 8,
                            instructions: ''
                        }
                    }
                ]
            }
        ]
    }
];
exports.default = gradeTopicChallenges;
//# sourceMappingURL=gradeTopicChallenges.js.map