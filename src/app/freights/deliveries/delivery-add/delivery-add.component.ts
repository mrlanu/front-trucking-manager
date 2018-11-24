import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {PickUp} from '../../pickups/pickup.model';
import {Subscription} from 'rxjs';
import {FreightsService} from '../../freights.service';
import {Freight} from '../../freight.model';
import {Address} from '../../../shared/address.model';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-delivery-add',
  templateUrl: './delivery-add.component.html',
  styleUrls: ['./delivery-add.component.css']
})
export class DeliveryAddComponent implements OnInit, OnDestroy {

  pickUpForm: FormGroup;
  kinds: string[] = ['PICKUP', 'DELIVERY'];
  componentSubs: Subscription[] = [];
  dataSource = new MatTableDataSource<PickUp>();
  displayedColumns = ['select', 'address', 'date', 'time'];
  selection = new SelectionModel<PickUp>(true, []);

  constructor(public dialogRef: MatDialogRef<DeliveryAddComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any,
              private freightService: FreightsService) { }

  ngOnInit() {

      this.componentSubs.push(this.freightService.pickupsChanged
        .subscribe((pickUps1: PickUp[]) => {
          this.dataSource.data = pickUps1;
          console.log(pickUps1);
        }));
      this.freightService.fetchAllPickUpsByFreightId(1);

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
