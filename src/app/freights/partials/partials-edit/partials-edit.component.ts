import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-partials-edit',
  templateUrl: './partials-edit.component.html',
  styleUrls: ['./partials-edit.component.css']
})
export class PartialsEditComponent implements OnInit {

  partialForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<PartialsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {

    this.partialForm = new FormGroup({
      'address': new FormGroup({
        'address1': new FormControl(''),
        'address2': new FormControl(''),
        'city': new FormControl(''),
        'state': new FormControl(''),
        'zip': new FormControl('')
      }),
      'kind': new FormControl('Pick-UP'),
      'date': new FormControl(''),
      'time': new FormControl(''),
      'trailer': new FormControl(''),
      'description': new FormControl('')
    });

  }

  onCancel() {
    this.dialogRef.close();
  }

}
