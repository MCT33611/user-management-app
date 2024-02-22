import { Role } from "./role"
export interface User {
    id?:number | null,
    name?:string | null,
    hashedPassword?:string | null,
    roleId?:number | null,
    role?:Role | null,
    photoUrl?:string | null,
    isBlocked?:boolean  | null
}
export interface UserModel{
    list:User[],
    errorMessage:string
}