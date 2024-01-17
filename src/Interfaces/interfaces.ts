export interface FormProps {
    id?: number;
    obs: Observation[];
    uri: string;
    handleSetReport: (reports: any) => void;
    handleDeleteReport?: (id : number) => void;
    displayReport?: Report
}
export interface ErrorObject {
    firstName?: string | undefined;
    lastName?:  string | undefined;
    dateOfBirth?:  string | undefined;
    gender?:  string | undefined;
    email?:  string | undefined;
    productCode?: string | undefined;
    observations?:  string | undefined;
    description?: string | undefined;
    date?: string | undefined;
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    NonBinary = "Non-binary"
}

export interface Observation {
id: number;
name: string;
}

export interface Author {
firstName: string;
lastName: string;
dateOfBirth: string;
gender: Gender | undefined;
email: string;
}

export interface ErrorObject {
firstName?: string | undefined;
lastName?:  string | undefined;
dateOfBirth?:  string | undefined;
gender?:  string | undefined;
email?:  string | undefined;
productCode?: string | undefined;
observations?:  string | undefined;
description?: string | undefined;
date?: string | undefined;
}

export interface Report {
id?: number;
author: Author | undefined;
productCode: string | undefined;
observations: (Observation[] | number[]);
description: string | undefined;
date: string | undefined;
}
