import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user.model';
import {Creds} from '../model/creds.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const user = new User(
      null,
      form.value.username,
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.phone,
      new Creds(null, form.value.password, form.value.secQuestion, form.value.secAnswer, false, false));
    this.authService.registration(user);
  }
}
