import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../../interfaces/user";

const getAdminState = createFeatureSelector<UserModel>('admin')

export const getUserList = createSelector(getAdminState, (state) => {
    
    return state.list;
})
