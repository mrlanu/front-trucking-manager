import {Component, OnDestroy, OnInit} from '@angular/core';
import {Freight} from '../freight.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {FreightsService} from '../freights.service';

@Component({
  selector: 'app-freights-manager',
  templateUrl: './freights-manager.component.html',
  styleUrls: ['./freights-manager.component.css']
})
export class FreightsManagerComponent implements OnInit, OnDestroy {

  freightId: number;
  freight: Freight;
  componentSubs: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private freightService: FreightsService) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.freightId = params['freightId'];
      }));
    this.componentSubs.push(this.freightService.freightChanged
      .subscribe((freight: Freight) => {
        console.log(freight);
      this.freight = freight;
    }));
    this.freightService.fetchFreightById(this.freightId);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }



}
