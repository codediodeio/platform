import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { User } from '@suite/core';
import { AuthService } from '@suite/core';


@Component({
  selector: 'mh-user-card',
  templateUrl: 'component.html',
  styleUrls: [ 'component.scss' ],
})
export class UserCardComponent implements OnInit {
  @Input() public user: User;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  public login() {
    this.auth.googleLogin()
      .then(console.log);
  }

  public logout() {
    this.auth.googleLogout()
      .then(console.log);
  }
}
