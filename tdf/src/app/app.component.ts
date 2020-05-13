import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue', 'Node'];
  topicHasError = false;
  successMsg = '';

  userModel = new User('','',null,'default','',true);

  constructor(private _enrollService: EnrollmentService){}

  validateTopic(value) {
    value === 'default' ? this.topicHasError = true : this.topicHasError = false;
  }

  submitUser() {
    this._enrollService.enroll(this.userModel)
      .subscribe(
        data => this.successMsg = "You are enrolled.",
        error => console.log('Error!', error)
      );    
  }

  close_alert(){
      this.successMsg = "";
  }
}
