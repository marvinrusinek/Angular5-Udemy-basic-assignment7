import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  defaultProjectStatus = 'Stable';
  submittedForm = false;
  forbiddenProjectNames = ['Test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required],
          this.asyncForbiddenProjectNamesValidator),
        'projectStatus': new FormControl(null, [Validators.required])
      }),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    this.submittedForm = true;
  }

  // forbiddenProjectNamesValidator(control: FormControl): {[s: string]: boolean} {
  //  if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //    return {'projectNameIsForbidden': true};
  //  }
  //  return null;
  //}

  asyncForbiddenProjectNamesValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'projectNameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
