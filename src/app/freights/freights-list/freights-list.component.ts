import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Freight} from '../freight.model';
import {FreightsService} from '../freights.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-freights-list',
  templateUrl: './freights-list.component.html',
  styleUrls: ['./freights-list.component.css']
})
export class FreightsListComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource = new MatTableDataSource<Freight>();
  displayedColumns = ['broker', 'date', 'employee', 'commodity', 'rate', 'weight', 'pallets', 'kind', 'description'];
  componentSubs: Subscription[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private freightsService: FreightsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.freightsService.freightsChanged
      .subscribe((freights: Freight[]) => {
        this.dataSource.data = freights;
      }));
    this.freightsService.fetchAllFreights();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectFreight(row) {
    this.router.navigate(['manager', row.freightId], {relativeTo: this.route});
  }


  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
