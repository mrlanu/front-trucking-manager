import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Freight} from '../freight.model';
import {FreightsService} from '../freights.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FreightsEditComponent} from '../freights-edit/freights-edit.component';

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
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.componentSubs.push(this.freightsService.freightsChanged
      .subscribe((freights: Freight[]) => {
        this.dataSource.data = freights;
      }));
    this.freightsService.fetchAllFreights();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectFreight(row) {
    this.router.navigate(['manager', row.freightId], {relativeTo: this.route});
  }

  onAddFreight() {
    let freight: Freight = null;
    const dialogRef = this.dialog.open(FreightsEditComponent, {
      width: '900px',
      data: {freight: freight}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          freight = result;
          // gonna be changed in the future with real logged employee
          freight.employee = {
            employeeId: 1,
            firstName: '',
            lastName: '',
            email: '',
            occupation: '',
            salary: null,
            salaryMeasure: ''
          };
          this.freightsService.storeFreight(freight)
            .subscribe(res => {
                this.freightsService.fetchAllFreights();
              },
              err => {
                console.log(err);
              });
        }
      });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
