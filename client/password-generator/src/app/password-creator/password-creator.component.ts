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
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  password: string = '';

  generatePassword() {
    // Verifica que al menos un checkbox esté activado
    if (!this.includeUppercase && !this.includeLowercase && !this.includeNumbers && !this.includeSymbols) {
      alert('Debes seleccionar al menos una opción para generar una contraseña.');
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (this.includeUppercase) allChars += uppercaseChars;
    if (this.includeLowercase) allChars += lowercaseChars;
    if (this.includeNumbers) allChars += numberChars;
    if (this.includeSymbols) allChars += symbolChars;

    this.password = Array.from({ length: this.length }, () =>
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    ).join('');
  }
}
