import {Component, Input, OnInit} from '@angular/core';
import {Freight} from '../freight.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FreightsEditComponent} from '../freights-edit/freights-edit.component';
import {FreightsService} from '../freights.service';
import {PickupEditComponent} from '../pickups/pickup-edit/pickup-edit.component';
import {PickUp} from '../pickups/pickup.model';

@Component({
  selector: 'app-freights-view',
  templateUrl: './freights-view.component.html',
  styleUrls: ['./freights-view.component.css']
})
export class FreightsViewComponent implements OnInit {

  @Input() freight: Freight;
  pickUp: PickUp;

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

  onAddPartial() {
    const dialogRef = this.dialog.open(PickupEditComponent, {
      width: '900px',
      data: {pickup: this.pickUp}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.pickUp = result;
          this.freightService.storePartial(this.freight.freightId, this.pickUp)
            .subscribe(res => {
              this.freightService.fetchAllPartialsByFreightId(this.freight.freightId);
              },
              err => {
                console.log(err);
            });
        }
      });
  }
}
