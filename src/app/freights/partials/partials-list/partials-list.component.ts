import { Component, OnInit } from '@angular/core';
import {Partial} from '../partial.model';
import {Address} from '../../../shared/address.model';

@Component({
  selector: 'app-partials-list',
  templateUrl: './partials-list.component.html',
  styleUrls: ['./partials-list.component.css']
})
export class PartialsListComponent implements OnInit {

  partials: Partial[] = [
    {
      partialId: 1,
      kind: 'Pick-up',
      date: new Date(),
      address: {
        address1: '200 Main St.',
        address2: '',
        city: 'Yakima',
        state: 'Washington',
        zip: 90010
      },
      time: '10-00',
      description: 'long loading',
      status: 'Unscheduled',
      location: null,
      trailer: null
    },
    {
      partialId: 2,
      kind: 'Pick-up',
      date: new Date(),
      address: {
        address1: '200 Main St.',
        address2: '',
        city: 'Yakima',
        state: 'Washington',
        zip: 90010
      },
      time: '10-00',
      description: 'long loading',
      status: 'Unscheduled',
      location: null,
      trailer: null
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
