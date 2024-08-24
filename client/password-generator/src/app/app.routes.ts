import { Routes } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { AppComponent } from './app.component';
import { PasswordCreatorComponent } from './password-creator/password-creator.component';
export const routes: Routes = [
    { path: '', component: PasswordCreatorComponent },
    { path: 'password-strength', component: PasswordStrengthComponent },

];
