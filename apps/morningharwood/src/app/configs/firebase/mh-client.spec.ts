import { FirebasePortfolio } from './mh-client';
import { isEqual } from 'lodash';


describe('AppComponent', () => {
  it('should have config method()', () => {
    expect(FirebasePortfolio.config()).toBeTruthy();
  });
  it('should have all keys for firebase needed', () => {
    const keys = [
      'apiKey',
      'authDomain',
      'databaseURL',
      'projectId',
      'storageBucket',
      'messagingSenderId',
    ];
    isEqual(keys, Object.keys(FirebasePortfolio.config()));
  })
});
