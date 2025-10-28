import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-game',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterGameComponent implements OnInit {
  registerGameForm: FormGroup; // ✅ sin ?

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

  ngOnInit() {}

  onSubmit() {
    if (this.registerGameForm.valid) {
      console.log('Datos del juego:', this.registerGameForm.value);
    }
  }
}
