export interface Animal {
    name: string;
}

export interface Person {
    name: string;
    animals: Animal[];
}

export interface Country {
    name: string;
    people: Person[];
}