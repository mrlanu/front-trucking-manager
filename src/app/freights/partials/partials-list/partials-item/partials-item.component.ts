import {Component, Input, OnInit} from '@angular/core';
import {Partial} from '../../partial.model';

@Component({
  selector: 'app-partials-item',
  templateUrl: './partials-item.component.html',
  styleUrls: ['./partials-item.component.css']
})
export class PartialsItemComponent implements OnInit {

  @Input() partial: Partial;

  constructor() { }

  ngOnInit() {
  }

}
