import {Component, Input, OnInit} from '@angular/core';
import {Partial} from '../partial.model';
import {FreightsService} from '../../freights.service';
import {Subscription} from 'rxjs';
import {Freight} from '../../freight.model';

@Component({
  selector: 'app-partials-list',
  templateUrl: './partials-list.component.html',
  styleUrls: ['./partials-list.component.css']
})
export class PartialsListComponent implements OnInit {

  @Input() freightId: number;
  partials: Partial[] = [];
  componentSubs: Subscription[] = [];

  constructor(private freightService: FreightsService) { }

  ngOnInit() {
    this.componentSubs.push(this.freightService.partialsChanged
      .subscribe((partials: Partial[]) => {
        this.partials = partials;
      }));
    this.freightService.fetchAllPartialsByFreightId(this.freightId);
  }

}
