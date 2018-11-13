import {Component, Input, OnInit} from '@angular/core';
import {Freight} from '../freight.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FreightsEditComponent} from '../freights-edit/freights-edit.component';
import {FreightsService} from '../freights.service';
import {PartialsEditComponent} from '../partials/partials-edit/partials-edit.component';
import {Partial} from '../partials/partial.model';

@Component({
  selector: 'app-freights-view',
  templateUrl: './freights-view.component.html',
  styleUrls: ['./freights-view.component.css']
})
export class FreightsViewComponent implements OnInit {

  @Input() freight: Freight;
  partial: Partial;

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
    const dialogRef = this.dialog.open(PartialsEditComponent, {
      width: '900px',
      data: {partial: this.partial}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.partial = result;
          console.log(this.partial);
          /*this.freightService.storeEditedFreight(this.freight)
            .subscribe(res => {},
              err => {
                console.log(err);
            });*/
        }
      });
  }
}
