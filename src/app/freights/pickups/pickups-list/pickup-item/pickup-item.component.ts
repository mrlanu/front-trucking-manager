import {Component, Input, OnInit} from '@angular/core';
import {PickUp} from '../../pickup.model';
import {PickupEditComponent} from '../../pickup-edit/pickup-edit.component';
import {MatDialog} from '@angular/material';
import {FreightsService} from '../../../freights.service';
import {Delivery} from '../../../deliveries/delivery.model';
import {DeliveryAddComponent} from '../../../deliveries/delivery-add/delivery-add.component';

@Component({
  selector: 'app-pickup-item',
  templateUrl: './pickup-item.component.html',
  styleUrls: ['./pickup-item.component.css']
})
export class PickupItemComponent implements OnInit {

  @Input() pickUp: PickUp;
  @Input() freightId: number;

  constructor(private dialog: MatDialog,
              private freightService: FreightsService) { }

  ngOnInit() {
  }

  onEditPickUp() {
    const dialogRef = this.dialog.open(PickupEditComponent, {
      width: '900px',
      data: {pickup: this.pickUp}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.pickUp = result;
          this.freightService.storeEditedPickUp(this.freightId, this.pickUp)
            .subscribe(res => {
                this.freightService.fetchAllPickUpsByFreightId(this.freightId);
              },
              err => {
                console.log(err);
              });
        }
      });
  }

  onEditDelivery(delivery: Delivery) {
    const dialogRef = this.dialog.open(DeliveryAddComponent, {
      width: '900px',
      data: {
        delivery: delivery,
        freightId: this.freightId
      },
    });
    // this.delivery = null;
    dialogRef.afterClosed()
      .subscribe(del => {
        if (del) {
          this.freightService.storeDelivery(this.freightId, del.form)
            .subscribe((storedDel: Delivery) => {
              del.pickUps.forEach(pickUp => {
                this.freightService.storeDeliveryForPickUp(pickUp.pickupId, storedDel)
                  .subscribe(res => {
                      console.log(res);
                    },
                    err => {
                      console.log(err);
                    });
              });
            });
        }
      });
  }

}
