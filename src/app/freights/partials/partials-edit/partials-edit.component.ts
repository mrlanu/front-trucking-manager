import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Partial} from '../partial.model';

@Component({
  selector: 'app-partials-edit',
  templateUrl: './partials-edit.component.html',
  styleUrls: ['./partials-edit.component.css']
})
export class PartialsEditComponent implements OnInit {

  partialForm: FormGroup;
  kinds: string[] = ['PICKUP', 'DELIVERY'];

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
      'partialId': new FormControl(''),
      'kind': new FormControl('PICKUP'),
      'date': new FormControl(new Date()),
      'time': new FormControl(''),
      'trailer': new FormControl(''),
      'description': new FormControl(''),
      'location': new FormControl(''),
      'status': new FormControl('')
    });

    if (this.passedData.partial) {
      this.setFormValueForEditPartial(this.passedData.partial);
      /*this.editMode = true;*/
    }
  }

  setFormValueForEditPartial(partial: Partial) {
    this.partialForm.setValue({
      'address': {
        address1: partial.address.address1,
        address2: partial.address.address2,
        city: partial.address.city,
        state: partial.address.state,
        zip: partial.address.zip},
      'partialId': partial.partialId,
      'kind': partial.kind,
      date: new Date(partial.date),
      'time': partial.time,
      'trailer': partial.trailer,
      'description': partial.description,
      'location': partial.location,
      'status': partial.status
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
