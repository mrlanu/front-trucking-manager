import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Freight} from './freight.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Partial} from './partials/partial.model';

@Injectable()
export class FreightsService {

  freightsChanged = new Subject<Freight[]>();
  freightChanged = new Subject<Freight>();
  partialsChanged = new Subject<Partial[]>()
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchAllFreights() {

    const url = this.baseUrl + '/freights';

    this.httpClient.get(url)
      .pipe(map((data: any) => {
        return data.content.map(freight => {
          return {
            ...freight
          };
        });
      }))
      .subscribe((freights: Freight[]) => {
        this.freightsChanged.next(freights);
    });
  }

  storeFreight(freight: Freight) {
    const url = this.baseUrl + '/freights';
    return this.httpClient.post(url, freight);
  }

  storeEditedFreight(freight: Freight) {
    const url = this.baseUrl + '/freights/' + freight.freightId ;
    return this.httpClient.put(url, freight);
  }

  fetchFreightById(freightId: number) {
    const url = this.baseUrl + '/freights/' + freightId;
    this.httpClient.get(url).subscribe((freight: Freight) => {
      this.freightChanged.next(freight);
    });
  }

  storePartial(freightId: number, partial: Partial) {
    const url = this.baseUrl + '/freights/' + freightId + '/pickups';
    return this.httpClient.post(url, partial);
  }

  storeEditedPartial(freightId: number, partial: Partial) {
    const url = this.baseUrl + '/freights/' + freightId + '/pickups/' + partial.pickupId;
    return this.httpClient.put(url, partial);
  }

  fetchAllPartialsByFreightId(freightId: number) {
    const url = this.baseUrl + '/freights/' + freightId + '/pickups';
    return this.httpClient.get(url).subscribe((partials: Partial[]) => {
      this.partialsChanged.next(partials);
    });
  }
}
