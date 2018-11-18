import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PickUp} from '../pickup.model';

@Component({
  selector: 'app-pickup-edit',
  templateUrl: './pickup-edit.component.html',
  styleUrls: ['./pickup-edit.component.css']
})
export class PickupEditComponent implements OnInit {

  pickUpForm: FormGroup;
  kinds: string[] = ['PICKUP', 'DELIVERY'];

  constructor(public dialogRef: MatDialogRef<PickupEditComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {

    this.pickUpForm = new FormGroup({
      'address': new FormGroup({
        'addressId': new FormControl(null),
        'address1': new FormControl(''),
        'address2': new FormControl(''),
        'city': new FormControl(''),
        'state': new FormControl(''),
        'zip': new FormControl('')
      }),
      'pickupId': new FormControl(''),
      'kind': new FormControl('PICKUP'),
      'date': new FormControl(new Date()),
      'time': new FormControl(''),
      'trailer': new FormControl(''),
      'description': new FormControl(''),
      'location': new FormControl(''),
      'status': new FormControl('UNSCHEDULED')
    });

    if (this.passedData.pickup) {
      this.setFormValueForEditPartial(this.passedData.pickup);
      /*this.editMode = true;*/
    }
  }

  setFormValueForEditPartial(partial: PickUp) {
    this.pickUpForm.setValue({
      'address': {
        addressId: partial.address.addressId,
        address1: partial.address.address1,
        address2: partial.address.address2,
        city: partial.address.city,
        state: partial.address.state,
        zip: partial.address.zip},
      'pickupId': partial.pickupId,
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
