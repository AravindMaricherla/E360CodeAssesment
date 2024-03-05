import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUsers),
        switchMap(() => this.userService.getUsers().pipe(
            map(users => UserActions.loadUsersSuccess({ users })),
            catchError(error => of(UserActions.loadUsersFailure({ error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}