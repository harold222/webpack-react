export interface IUser {
    info: Iinfo,
    loading: boolean,
    error: string,
}

export interface Iinfo {
    typeOfDocument: number,
    numberDocument: string,
    phone: string,
    email: string,
}