import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subject, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatNativeDateModule, DateAdapter,
  MAT_DATE_FORMATS, MatRippleModule, MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    TextFieldModule,
    MatCardModule,
    MatSortModule,
    MatExpansionModule,
    // DatePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserComponent implements OnInit {
  users: Observable<User[]> | undefined;
  isSaving: boolean = false;

  disabledSpinner: boolean = false;
  loadData: boolean = true;
  userData: any = [];
  newData: any = [];
  columnsToDisplay = ['username', 'age', 'gender', 'email', 'phone', 'birthDate'];
  genderArray = [
    {
      name: "male",
      value: "male",
    },
    {
      name: "female",
      value: "female",
    }
  ];

  dataSource: any

  save: boolean = false;
  expandedElement: any;
  userForm: any = FormGroup;
  private _unsubscribeAll: Subject<any>;

  private postService = inject(UserService);

  constructor(
    private formGroup: FormBuilder,
    // public datepipe: DatePipe,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.userForm = this.formGroup.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), this.noWhitespaceValidator]],
      maidenName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), this.noWhitespaceValidator]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), this.noWhitespaceValidator]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    });

    this.getUserList();
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  getUserList() {
    this.postService.getUserList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      console.log("helloooo", res);
      this.userData = res.users;
      this.userData.forEach((element: any) => {
        element.show = false
        element.disabledSpinner = false
      });
      this.loadData = false;
    });
  }


  toggleRow(value: any) {
    const foundElement = this.userData.find((elem: any) => elem !== undefined && elem.id === value.id)
    console.log("The found element is " + JSON.stringify(foundElement));
    const index = this.userData.indexOf(foundElement);

    this.userData.forEach((element: any, mainindex: any) => {

      if (index != mainindex) {
        element.show = false;
      }
    });
    this.userForm.get('id').setValue(foundElement.id);
    this.userForm.get('firstName').setValue(foundElement.firstName);
    this.userForm.get('maidenName').setValue(foundElement.maidenName);
    this.userForm.get('lastName').setValue(foundElement.lastName);
    this.userForm.get('age').setValue(foundElement.age);
    this.userForm.get('gender').setValue(foundElement.gender);
    this.userForm.get('gender').setValue(foundElement.gender);
    this.userForm.get('email').setValue(foundElement.email);
    this.userForm.get('phone').setValue(foundElement.phone);
    this.userForm.get('birthDate').setValue(foundElement.birthDate);

    this.userData[index].show = !this.userData[index].show;
  }


  saveUser() {
    if (this.userForm.status == "VALID") {
      this.disabledSpinner = true;
      this.save = true;
      this.newData = this.userData;
      setTimeout(() => {
        this.newData.forEach((element: any) => {
          if (element.id === this.userForm.value.id) {
            element.firstName = this.userForm.value.firstName;
            element.lastName = this.userForm.value.lastName;
            element.maidenName = this.userForm.value.maidenName;
            element.gender = this.userForm.value.gender;
            element.age = this.userForm.value.age;
            element.email = this.userForm.value.email;
            element.phone = this.userForm.value.phone;
            element.birthDate = this.userForm.value.birthDate;
            element.disabledSpinner = true;
          }
        });

        this.userData = this.newData;
        this.newData.forEach((element: any) => {
          if (element.id === this.userForm.value.id) {
            element.show = false;
            this.disabledSpinner = false;
            this.save = false;
          }
        });
      }, 5000);
    }
  }

  closeExpendedDiv(value: any) {
    const foundElement = this.userData.find((elem: any) => elem !== undefined && elem.id === value.id)
    const index = this.userData.indexOf(foundElement);
    this.userData[index].show = !this.userData[index].show;
    this.disabledSpinner = false;
    this.save = false;
  }

}
