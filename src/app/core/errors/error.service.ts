import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorHistory: any[] = [];

  constructor() {}

  catchError(err: any): void {
    this.errorHistory.push(err);
    console.error(`[error-service] catch error`, err);
  }
}
