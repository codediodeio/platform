import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RouterActions from './actions';
import { RoutesName } from './config';


@Injectable()
export class StoreNavigateService {
  public to = RoutesName;

  constructor(private store: Store<any>) {}

  public go(path): void {
    this.store.dispatch(new RouterActions.Go({ path: [ path ] }));
  }
}
