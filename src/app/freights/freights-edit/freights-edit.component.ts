import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FreightsService} from '../freights.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Freight} from '../freight.model';

@Component({
  selector: 'app-freights-edit',
  templateUrl: './freights-edit.component.html',
  styleUrls: ['./freights-edit.component.css']
})
export class FreightsEditComponent implements OnInit, OnDestroy {

  isLoading = false;
  editMode = false;
  freightId: number;
  freightForm: FormGroup;
  kinds: String[] = ['Dry', 'Frozen', 'Chilled'];
  private componentSubs: Subscription[] = [];

  constructor(private freightService: FreightsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.freightId = params['freightId'];
        this.editMode = params['freightId'] != null;
      }));
    this.componentSubs.push(this.freightService.freightChanged
      .subscribe((freight: Freight) => {
        this.setFormValueForEditFreight(freight);
      }));
    if (this.editMode) {
      this.isLoading = true;
      this.freightService.fetchFreightById(this.freightId);
    }
    this.initForm();
  }

  private initForm() {

    this.freightForm = new FormGroup({
      'date': new FormControl(new Date()),
      'broker': new FormControl('', Validators.required),
      'commodity': new FormControl('', Validators.required),
      'rate': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'kind': new FormControl(''),
      'weight': new FormControl('', Validators.pattern(/^[1-9]+[0-9]*$/)),
      'pallets': new FormControl('', Validators.pattern(/^[1-9]+[0-9]*$/)),
      'description': new FormControl('')
    });
  }

  setFormValueForEditFreight(freight: Freight) {
    this.freightForm.setValue({
      date: freight.date,
      broker: freight.broker,
      rate: freight.rate,
      weight: freight.weight,
      pallets: freight.pallets,
      kind: freight.kind,
      description: freight.description,
      commodity: freight.commodity
    });
    this.isLoading = false;
  }

  onSubmit() {
    this.freightService.storeFreight(this.freightForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
