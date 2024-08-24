import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PasswordCreatorComponent } from './password-creator/password-creator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HeaderComponent, FooterComponent,PasswordCreatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Propiedades vinculadas a ngModel
  
}
