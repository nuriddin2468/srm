import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;
  validUser = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(
        null,
        [Validators.minLength(5), Validators.required]
      ),
      password: new FormControl(
        null, [Validators.minLength(5), Validators.required]
      )
    });
  }

  signIn(): void {
    if (this.form.invalid) return;
    this.authService.signIn(
      this.form.value.username,
      this.form.value.password
    ).pipe(untilDestroyed(this)).subscribe(res => {
      if (!res) {
        this.validUser = false;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
