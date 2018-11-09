import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Freight} from './freight.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class FreightsService {

  freightsChanged = new Subject<Freight[]>();
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchAllFreights() {

    const url = this.baseUrl + '/freights';

    this.httpClient.get(url)
      .pipe(map((data: any) => {
        return data.content.map(fr => {
          return {
            freightId: fr.freightId,
            kind: fr.name
          };
        });
      }))
      .subscribe((freights: Freight[]) => {
        this.freightsChanged.next(freights);
        console.log(freights);
    });
  }

  storeFreight(freight: Freight) {
    const url = this.baseUrl + '/freights';
    this.httpClient.post(url, freight).subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    });
  }

}
