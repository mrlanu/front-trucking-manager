import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Freight} from '../freight.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FreightsEditComponent} from '../freights-edit/freights-edit.component';
import {FreightsService} from '../freights.service';
import {PickupEditComponent} from '../pickups/pickup-edit/pickup-edit.component';
import {PickUp} from '../pickups/pickup.model';
import {DeliveryAddComponent} from '../deliveries/delivery-add/delivery-add.component';
import {Delivery} from '../deliveries/delivery.model';
import {DeleteConfirmComponent} from '../../shared/delete-confirm.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-freights-view',
  templateUrl: './freights-view.component.html',
  styleUrls: ['./freights-view.component.css']
})
export class FreightsViewComponent implements OnInit, OnDestroy {

  @Input() freight: Freight;
  pickUp: PickUp;
  delivery: Delivery;
  componentSubs: Subscription[] = [];

  constructor(private router: Router,
              private dialog: MatDialog,
              private freightService: FreightsService) { }

  ngOnInit() {
  }

  onEditFreight() {
    const dialogRef = this.dialog.open(FreightsEditComponent, {
      width: '900px',
      data: {freight: this.freight}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
      if (result) {
        this.freight = result;
        this.freightService.storeEditedFreight(this.freight)
          .subscribe(res => {},
            err => {
          console.log(err);
        });
      }
    });
  }

  onAddPickUp() {
    const dialogRef = this.dialog.open(PickupEditComponent, {
      width: '900px',
      data: {pickup: this.pickUp}
    });
    dialogRef.afterClosed()
      .subscribe(pickUp => {
        if (pickUp) {
          this.freightService.storePickUp(this.freight.freightId, pickUp)
            .subscribe(res => {
              this.freightService.fetchAllPickUpsByFreightId(this.freight.freightId);
              },
              err => {
                console.log(err);
            });
        }
      });
  }

  onAddDelivery() {
    const dialogRef = this.dialog.open(DeliveryAddComponent, {
      width: '900px',
      data: {
        delivery: this.delivery,
        freightId: this.freight.freightId
      },
    });
    this.delivery = null;
    dialogRef.afterClosed()
      .subscribe(del => {
        if (del) {
          this.freightService.storeDelivery(this.freight.freightId, del.form)
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

  onDeleteFreight() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.componentSubs.push(this.freightService.deleteFreight(this.freight)
          .subscribe(res => {
            this.freightService.fetchAllFreights();
            this.router.navigate(['/freights']);
          }, err => {
            console.log(err);
          }));
      } else {
        dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
