export interface IUser {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
}
export interface IUserData extends IUser {
    _id?: string
    password: string
}