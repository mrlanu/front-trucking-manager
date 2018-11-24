import {Component, Input, OnInit} from '@angular/core';
import {PickUp} from '../../pickup.model';
import {PickupEditComponent} from '../../pickup-edit/pickup-edit.component';
import {MatDialog} from '@angular/material';
import {FreightsService} from '../../../freights.service';

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

  onEditPartial() {
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

}
