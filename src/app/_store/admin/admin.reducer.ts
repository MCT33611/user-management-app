import { createReducer, on } from "@ngrx/store";
import { adminState } from "./admin.state";
import { changeUserAccessSuccess, deleteUser, deleteUserSuccess, laodUserFail, laodUserSuccess, upsertUserSuccess } from "./admin.actions";
import { state } from "@angular/animations";

const _adminReducer = createReducer(adminState,
    on(laodUserSuccess, (state, action) => {
        // console.log(action.list);

        return {
            ...state,
            list: action.list,
            errorMessage: ''
        }
    }),
    on(laodUserFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errormessage

        }
    }),
    on(deleteUserSuccess, (state, action) => {
        const newList = state.list.filter(ele => ele.id !== action.userId);

        return {
            ...state,
            list: newList,
            errorMessage: ''
        };
    }),

    on(upsertUserSuccess, (state, action) => {
        let newList;

        if (action.user.id === (0||undefined)) {
            newList = [...state.list, action.user];
            
        } else {
            newList = state.list.map((ele) =>
                ele.id === action.user.id ? action.user : ele
            );
        }

        return {
            ...state,
            list: newList,
            errorMessage: ''
        };
    }),
    on(changeUserAccessSuccess, (state, action) => {
        const newList = state.list.map((ele) => {
          if (action.userId === ele.id) {
            return { ...ele, isBlocked: !ele.isBlocked };
          }
          return ele;
        });
      
        return {
          ...state,
          list: newList,
          errorMessage: ''
        };
      }),
      

)

export function adminReducer(state: any, action: any) {
    // console.log(_adminReducer(state, action))
    return _adminReducer(state, action)
}