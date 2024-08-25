import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent {
  password: string = '';
  years: number = 0;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  displayTime: string = '';
  strengthLevel: number = 0;
  weaknessData: { message: string, imageUrl: string } = { message: '', imageUrl: '' };


  timeThresholds = [
    { threshold: 1, message: "Your password is as easy to crack as it is to blink—literally, in the blink of an eye.", imageUrl: "blink.png" },
    { threshold: 10, message: "Your password is very weak! It could be cracked faster than it takes to say 'supercalifragilisticexpialidocious'.", imageUrl: "mary.png" },
    { threshold: 60, message: "Your password is very weak! It could be cracked quicker than it takes to brew a cup of instant coffee.", imageUrl: "coffe.png" },
    { threshold: 300, message: "Your password is very weak! It could be cracked in less time than it takes to watch a trailer for a new movie.", imageUrl: "movie.png" },
    { threshold: 600, message: "Your password is very weak! It could be cracked faster than it takes to finish a quick workout.", imageUrl: "weight.png" },
    { threshold: 1200, message: "Your password is weak! It could be cracked faster than it takes to complete a quick phone call.", imageUrl: "phone.jpg" },  // New division
    { threshold: 1800, message: "Your password is weak! It could be cracked in less time than it takes to make a simple lunch.", imageUrl: "lunch.png" },  // New division
    { threshold: 3600, message: "Your password is weak! It could be cracked before you’ve finished watching your favorite episode of 'Friends'.", imageUrl: "friends.png" },
    { threshold: 7200, message: "Your password is weak! It could be cracked in less time than it takes to go for a short run.", imageUrl: "run.png" },  // New division
    { threshold: 86400, message: "Your password is ok! could be cracked in the time it takes to drive across the city during rush hour.", imageUrl: "car.png" },
    { threshold: 172800, message: "Your password is ok! It could be cracked in less time than it takes to travel to a neighboring city.", imageUrl: "city.png" },  // New division
    { threshold: 259200, message: "Your password is good! It could be cracked in less time than it takes to complete a multi-day business trip.", imageUrl: "business.png" },  // New division
    { threshold: 604800, message: "Your password is good! It could be cracked in less time than it takes to go on a week-long vacation.", imageUrl: "vacation.png" },
    { threshold: 2592000, message: "Your password is good! It could be cracked in less time than it takes to spend a month on a cruise.", imageUrl: "ship.png" },
    { threshold: 31536000, message: "Your password is hard! It would take more time than than it takes for the Earth to complete a rotation.", imageUrl: "earth.png" },
    { threshold: Infinity, message: "Your password very hard! It would take more time than than it takes for the Earth to complete a rotation.", imageUrl: "earth.png" }
  ];
  
  

  checkPassword() {
    if (this.password) {
      const charsetSize = this.calculateCharsetSize(this.password);
      const passwordLength = this.password.length;
      const spaceOfSearch = Math.pow(charsetSize, passwordLength);
      const attemptsPerSecond = Math.pow(10, 9); // 1,000,000,000 attempts per second

      const timeInSeconds = spaceOfSearch / attemptsPerSecond;

      this.convertTime(timeInSeconds);
      this.strengthLevel = this.getStrengthLevel(timeInSeconds);
      this.weaknessData = this.getWeaknessMessage(timeInSeconds);
    } else {
      this.displayTime = ''; // Clear the display if the password is empty
      this.strengthLevel = 0; // Clear the strength level if the password is empty
      this.weaknessData = { message: '', imageUrl: '' };
    }
  }

  calculateCharsetSize(password: string): number {
    let charsetSize = 0;

    // Check if the password contains lowercase letters
    if (/[a-z]/.test(password)) charsetSize += 26;

    // Check if the password contains uppercase letters
    if (/[A-Z]/.test(password)) charsetSize += 26;

    // Check if the password contains digits
    if (/\d/.test(password)) charsetSize += 10;

    // Check if the password contains special characters
    if (/[\W_]/.test(password)) charsetSize += 33;

    return charsetSize;
  }

  convertTime(seconds: number) {
    if (seconds < 1) {
      this.displayTime = '> 1 second';
      return;
    }

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInYear = 31536000;

    this.years = Math.floor(seconds / secondsInYear);
    seconds %= secondsInYear;

    this.days = Math.floor(seconds / secondsInDay);
    seconds %= secondsInDay;

    this.hours = Math.floor(seconds / secondsInHour);
    seconds %= secondsInHour;

    this.minutes = Math.floor(seconds / secondsInMinute);
    seconds %= secondsInMinute;

    this.seconds = Math.floor(seconds);

    this.constructDisplayTime();
  }

  constructDisplayTime() {
    let timeParts = [];

    if (this.years > 0) timeParts.push(`${this.years} year${this.years > 1 ? 's' : ''}`);
    if (this.days > 0) timeParts.push(`${this.days} day${this.days > 1 ? 's' : ''}`);
    if (this.hours > 0) timeParts.push(`${this.hours} hour${this.hours > 1 ? 's' : ''}`);
    if (this.minutes > 0) timeParts.push(`${this.minutes} minute${this.minutes > 1 ? 's' : ''}`);
    if (this.seconds > 0) timeParts.push(`${this.seconds} second${this.seconds > 1 ? 's' : ''}`);

    this.displayTime = timeParts.join(', ');
  }

  getStrengthLevel(seconds: number): number {
    if (seconds < 3600) {
      return 0; // Nivel 0 (muy débil)
    } else if (seconds < 86400) {
      return 1; // Nivel 1 (débil)
    } else if (seconds < 31536000) {
      return 2; // Nivel 2 (medio)
    } else {
      return 3; // Nivel 3 (fuerte)
    }
  }

  getStrengthClass(): string {
    const classes = ['alert-danger', 'alert-warning', 'alert-info', 'alert-success'];
    return classes[this.strengthLevel];
  }

  getWeaknessMessage(seconds: number): { message: string, imageUrl: string } {
    // Busca el primer umbral que supere el tiempo en segundos
    const threshold = this.timeThresholds.find(t => seconds < t.threshold);
    
    // Devuelve un objeto con el mensaje y la URL de la imagen
    return threshold ? { message: threshold.message, imageUrl: threshold.imageUrl } : { message: '', imageUrl: '' };
  }
}

