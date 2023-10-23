import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error desconocido';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = ` ${error.error}`;
        } else {
          // Error del lado del servidor
          errorMessage = ` ${error.error}`;
        }

        // Aquí puedes mostrar el mensaje de error en un alert, consola o realizar otras acciones
        alert(errorMessage);

        // Puedes propagar el error para que otros manejen también
        return throwError(errorMessage);
      })
    );
  }
}