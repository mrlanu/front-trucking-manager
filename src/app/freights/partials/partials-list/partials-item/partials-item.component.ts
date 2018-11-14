import {Component, Input, OnInit} from '@angular/core';
import {Partial} from '../../partial.model';
import {PartialsEditComponent} from '../../partials-edit/partials-edit.component';
import {MatDialog} from '@angular/material';
import {FreightsService} from '../../../freights.service';

@Component({
  selector: 'app-partials-item',
  templateUrl: './partials-item.component.html',
  styleUrls: ['./partials-item.component.css']
})
export class PartialsItemComponent implements OnInit {

  @Input() partial: Partial;
  @Input() freightId: number;

  constructor(private dialog: MatDialog,
              private freightService: FreightsService) { }

  ngOnInit() {
  }

  onEditPartial() {
    const dialogRef = this.dialog.open(PartialsEditComponent, {
      width: '900px',
      data: {partial: this.partial}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.partial = result;
          this.freightService.storeEditedPartial(this.freightId, this.partial)
            .subscribe(res => {
                this.freightService.fetchAllPartialsByFreightId(this.freightId);
              },
              err => {
                console.log(err);
              });
        }
      });
  }

}
