import { Routes } from '@angular/router';
import { UserComponent } from './users/user/user.component';

export const routes: Routes = [

    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserComponent }

];
