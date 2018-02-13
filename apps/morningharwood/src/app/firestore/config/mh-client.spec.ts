import { isEqual } from 'lodash';
import { MhClientFirestore } from './mh-client';

describe('Config Firestore', () => {
  it('should have config method()', () => {
    expect(MhClientFirestore.config()).toBeTruthy();
  });

  it('should have all keys for Firestore needed', () => {
    const keys = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId'];
    isEqual(keys, Object.keys(MhClientFirestore.config()));
  });
});
