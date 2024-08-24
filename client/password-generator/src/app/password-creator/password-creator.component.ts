import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
@Component({
  selector: 'app-password-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-creator.component.html',
  styleUrl: './password-creator.component.css'
})
export class PasswordCreatorComponent {
  length: number = 12;
  includeUppercase: boolean = true;
  includeLowercase: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;
  password: string = '';

  // Implementa el método generatePassword si lo necesitas
  generatePassword() {
    // Lógica para generar la contraseña
    this.password = this.length.toString();
  }
}
