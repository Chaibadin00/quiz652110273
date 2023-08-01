export interface Choice {
    id: number;
    text: string;
    isAnswer: boolean;
}

export interface Question {
    id: number;
    text: string;
    image?: string; // Add the 'image' property as an optional property
    choices: Choice[];
}