import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ IMPORTANTE
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterGameComponent {
  registerGameForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerGameForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [1, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.registerGameForm.valid) {
      console.log('Juego registrado:', this.registerGameForm.value);
    }
  }
}
