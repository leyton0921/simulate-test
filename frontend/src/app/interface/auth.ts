export interface IUser {
    name:string;
    email:string;
    password:string;
}

export interface IUserToken {
    token:string;
    user:IUser;
}
