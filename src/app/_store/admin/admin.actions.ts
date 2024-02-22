import { createAction, props } from "@ngrx/store"
import { User } from "../../interfaces/user"

export const SHOW_ALERT = '[user] show alert'

export const LOAD_USERS = '[user] load users'
export const LOAD_USERS_SUCCESS = '[user] load user success'
export const LOAD_USERS_FAIL = '[user] load user fail'

export const UPSERT_USER = '[user] upsert users'
export const UPSERT_USERS_SUCCESS = '[user] upsert user success'

export const DELETE_USER = '[user] delete users'
export const DELETE_USERS_SUCCESS = '[user] delete user success'

export const CHANGE_USER_ACCESS = '[user] change users access '
export const CHANGE_USER_ACCESS_SUCCESS = '[user] change users access success'

export const loadUser = createAction(LOAD_USERS)
export const laodUserSuccess = createAction(LOAD_USERS_SUCCESS,props<{list: User[]}>())
export const laodUserFail = createAction(LOAD_USERS_FAIL,props<{errormessage:string}>())

export const upsertUser = createAction(UPSERT_USER,props<{user: User}>())
export const upsertUserSuccess = createAction(UPSERT_USERS_SUCCESS,props<{user: User}>())

export const deleteUser = createAction(DELETE_USER,props<{userId: number}>())
export const deleteUserSuccess = createAction(DELETE_USERS_SUCCESS , props<{userId: number}>())

export const changeUserAccess = createAction(CHANGE_USER_ACCESS,props<{userId: number}>())
export const changeUserAccessSuccess = createAction(CHANGE_USER_ACCESS_SUCCESS , props<{userId: number}>())

export const showAlert = createAction(SHOW_ALERT,props<{message:string,resptype:string}>())
