import { Component, OnInit } from '@angular/core';
import {Freight} from '../freight.model';
import {FreightsService} from '../freights.service';

@Component({
  selector: 'app-freights-list',
  templateUrl: './freights-list.component.html',
  styleUrls: ['./freights-list.component.css']
})
export class FreightsListComponent implements OnInit {

  freights: Freight[] = [];

  constructor(private freightsService: FreightsService) { }

  ngOnInit() {
    this.freightsService.fetchAllFreights();
  }

}
