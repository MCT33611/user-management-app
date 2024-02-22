import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AccountService } from "../../services/account.service";
import { Observable, catchError, empty, exhaustAll, exhaustMap, map, of, switchMap } from "rxjs";
import { laodUserSuccess, loadUser, laodUserFail, upsertUser, upsertUserSuccess, deleteUser, deleteUserSuccess, showAlert, changeUserAccess, changeUserAccessSuccess } from "./admin.actions";
import { ToastrService } from "ngx-toastr";
import { Action } from "@ngrx/store";

@Injectable()

export class AdminEffects {
    constructor(private action$: Actions, private service: AccountService, private toastr: ToastrService) {
    }

    _loadUser = createEffect(() =>
        this.action$.pipe(
            ofType(loadUser),
            exhaustMap((action) => {
                return this.service.getAllUsers().pipe(
                    map((data) => {
                        return laodUserSuccess({ list: data })
                    }),
                    catchError((_err) => of(laodUserFail({ errormessage: _err.message })))
                )
            })
        )
    )

    _upsertUser = createEffect(() =>
        this.action$.pipe(
            ofType(upsertUser),
            switchMap((action) => {
                return this.service.upsertUser(action.user).pipe(
                    switchMap(() => {
                        return of(upsertUserSuccess({user:action.user}), showAlert({ message: "user added successfully", resptype: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: "fail to add user", resptype: 'fail' })))
                )
            })
        )
    )


    _deleteUser = createEffect(() =>
        this.action$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                return this.service.deleteUser(action.userId).pipe(
                    switchMap(() => {
                        return of(deleteUserSuccess({ userId: action.userId }), showAlert({ message: "user deleted successfully", resptype: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: "fail to delete user", resptype: 'fail' })))
                    
                )
            })
        )
    )

    _changeUserAccess = createEffect(() =>
    this.action$.pipe(
        ofType(changeUserAccess),
        switchMap((action) => {
            return this.service.updateUserAccess(action.userId).pipe(
                switchMap(() => {
                    return of(changeUserAccessSuccess({ userId: action.userId }), showAlert({ message: "user access changed successfully", resptype: 'pass' }))
                }),
                catchError((_err) => of(showAlert({ message: "fail to change user access", resptype: 'fail' })))
                
            )
        })
    )
)
    _showAlert = createEffect(() =>
        this.action$.pipe(
            ofType(showAlert),
            exhaustMap((action) => {
                if (action.resptype === 'pass') {
                    this.toastr.success(action.message);
                } else {
                    this.toastr.error(action.message);
                }
                return empty() as Observable<Action>;
            })
        )
    );


}