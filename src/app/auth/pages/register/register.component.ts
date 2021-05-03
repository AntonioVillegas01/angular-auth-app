import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['Marco', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  register() {
    const {name, email, password} = this.miFormulario.value;

    this.authService.registro(name, email, password).subscribe(authServiceResponse => {
      if (authServiceResponse === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          title: 'Error!',
          text: authServiceResponse,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
