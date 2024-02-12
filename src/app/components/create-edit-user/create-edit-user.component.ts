import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { User, UserServiceService } from '../../services/user-service.service';


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css',
})
export class CreateEditUserComponent implements OnInit {
 constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private createUserDialog: MatDialogRef<CreateEditUserComponent>,
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    private formBuilder: FormBuilder,
  ) {} 
  
  myForm!: FormGroup;
  usersService: any;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
    });
    if (this.data) {
      this.myForm.patchValue(this.data);
    }
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.dialogRef.close(this.myForm.value);
    }
  }
}
