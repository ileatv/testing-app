export type Options = {
    id: number;
    optionText: string;
    right: boolean;
};

export type Questions = {
    id: number;
    questionText: string;
    questionCost: number;
    responseEntityOptions: Options[];
};

export type QuizData = {
    id: number;
    testName: string;
    responseEntities: Questions[];
};