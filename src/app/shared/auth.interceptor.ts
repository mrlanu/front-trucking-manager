import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.endsWith('signup')) {
      return next.handle(req);
    }

    if (req.headers.keys().length === 0) {
      const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
      return next.handle(newReq);
    }

    return next.handle(req);
  }
}
