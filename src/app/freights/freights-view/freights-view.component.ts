import {Component, Input, OnInit} from '@angular/core';
import {Freight} from '../freight.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-freights-view',
  templateUrl: './freights-view.component.html',
  styleUrls: ['./freights-view.component.css']
})
export class FreightsViewComponent implements OnInit {

  @Input() freight: Freight;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onEditTask(freightId: number) {
    this.router.navigate(['freights', 'edit', freightId]);
  }
}
