import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Freight} from '../freight.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-freights-edit',
  templateUrl: './freights-edit.component.html',
  styleUrls: ['./freights-edit.component.css']
})
export class FreightsEditComponent implements OnInit {

  editMode = false;
  freightId: number;
  freightForm: FormGroup;
  kinds: String[] = ['Dry', 'Frozen', 'Chilled'];

  constructor(public dialogRef: MatDialogRef<FreightsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {

    this.freightForm = new FormGroup({
      'freightId': new FormControl(''),
      'date': new FormControl(new Date()),
      'broker': new FormControl('', Validators.required),
      'commodity': new FormControl('', Validators.required),
      'rate': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'kind': new FormControl(''),
      'weight': new FormControl('', Validators.pattern(/^[1-9]+[0-9]*$/)),
      'pallets': new FormControl('', Validators.pattern(/^[1-9]+[0-9]*$/)),
      'description': new FormControl(''),
      'employee': new FormControl('')
    });

    if (this.passedData.freight) {
      this.setFormValueForEditFreight(this.passedData.freight);
      this.editMode = true;
    }
  }

  setFormValueForEditFreight(freight: Freight) {
    this.freightForm.setValue({
      freightId: freight.freightId,
      date: freight.date,
      broker: freight.broker,
      rate: freight.rate,
      weight: freight.weight,
      pallets: freight.pallets,
      kind: freight.kind,
      description: freight.description,
      commodity: freight.commodity,
      employee: freight.employee
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
