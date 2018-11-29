import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PickUp} from '../pickup.model';
import {FreightsService} from '../../freights.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pickups-list',
  templateUrl: './pickups-list.component.html',
  styleUrls: ['./pickups-list.component.css']
})
export class PickupsListComponent implements OnInit, OnDestroy {

  @Input() freightId: number;
  pickUps: PickUp[] = [];
  componentSubs: Subscription[] = [];

  constructor(private freightService: FreightsService) { }

  ngOnInit() {
    this.componentSubs.push(this.freightService.pickupsChanged
      .subscribe((pickUps1: PickUp[]) => {
        this.pickUps = pickUps1;
      }));
    this.freightService.fetchAllPickUpsByFreightId(this.freightId);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
