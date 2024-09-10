//iniciamos con quicktipe
export interface IBodyResponseGetAllPosts {
    message: string;
    posts:    Datum[];
}

export interface Datum {
    id        : string;
    title     : string;
    description: string;
    user_id   : string;
}
// esto ya es la parte para crear los Post
export interface BodyRequestCreatePost{
    title : string,
    description: string;
    user_id   : string;
}
export interface BodyResponseCreatePost {
    message: string;
    data: Record<string, string>;
}

// traer Post por ID

export interface BodyResponseGetByID{
    message:string,
    data:Record<string,string>;

}

// para actualizar el Post se usa una igual a la de arriba se podria reutilizar pero es para entender el orden 
export interface BodyrequestUpdatePost{
    title : string,
    description: string;
    user_id   : number;

}

export interface BodyResponseUpdatePost{
    message:string,
    data:Record<string,string>;

}

// para elimnar

export interface BodyResponseDeletePost{
    message:string,
    data:null
}

