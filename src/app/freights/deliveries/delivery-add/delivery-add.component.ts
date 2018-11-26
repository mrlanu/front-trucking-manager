import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {PickUp} from '../../pickups/pickup.model';
import {Subscription} from 'rxjs';
import {FreightsService} from '../../freights.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Delivery} from '../delivery.model';

@Component({
  selector: 'app-delivery-add',
  templateUrl: './delivery-add.component.html',
  styleUrls: ['./delivery-add.component.css']
})
export class DeliveryAddComponent implements OnInit, OnDestroy {

  deliveryForm: FormGroup;
  kinds: string[] = ['PICKUP', 'DELIVERY'];
  componentSubs: Subscription[] = [];
  dataSource = new MatTableDataSource<PickUp>();
  displayedColumns = ['select', 'date', 'time', 'address'];
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
      console.log('FreightId');
      console.log(this.passedData.freightId);
      this.freightService.fetchAllPickUpsByFreightId(this.passedData.freightId);

    this.deliveryForm = new FormGroup({
      'address': new FormGroup({
        'addressId': new FormControl(null),
        'address1': new FormControl(''),
        'address2': new FormControl(''),
        'city': new FormControl(''),
        'state': new FormControl(''),
        'zip': new FormControl('')
      }),
      'deliveryId': new FormControl(''),
      'kind': new FormControl('DELIVERY'),
      'date': new FormControl(new Date()),
      'time': new FormControl(''),
      'trailer': new FormControl(''),
      'description': new FormControl(''),
      'location': new FormControl(''),
      'status': new FormControl('UNSCHEDULED')
    });

    /*if (this.passedData.delivery) {
      this.setFormValueForEditDelivery(this.passedData.delivery);
      /!*this.editMode = true;*!/
    }*/
  }

  setFormValueForEditDelivery(delivery: Delivery) {
    this.deliveryForm.setValue({
      'address': {
        addressId: delivery.address.addressId,
        address1: delivery.address.address1,
        address2: delivery.address.address2,
        city: delivery.address.city,
        state: delivery.address.state,
        zip: delivery.address.zip},
      'deliveryId': delivery.deliveryId,
      'kind': delivery.kind,
      'date': new Date(delivery.date),
      'time': delivery.time,
      'trailer': delivery.trailer,
      'description': delivery.description,
      'location': delivery.location,
      'status': delivery.status
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
