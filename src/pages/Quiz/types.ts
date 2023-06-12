export type Option = {
    id: number;
    optionText: string;
    right: boolean;
};

export type Question = {
    id: number;
    questionText: string;
    questionCost: number;
    responseEntityOptions: Option[];
};

export type QuizData = {
    id: number;
    testName: string;
    responseEntities: Question[];
};