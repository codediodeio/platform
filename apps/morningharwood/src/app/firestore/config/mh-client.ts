import { FirebaseAppConfig } from 'angularfire2';

export class MhClientFirestore {
  public static config(): FirebaseAppConfig {
    return {
      apiKey: 'AIzaSyDMNHtmgsu2dv9MPmUA_EOrt7vS00PW12M',
      authDomain: 'mh-client.firebaseapp.com',
      databaseURL: 'https://mh-client.firebaseio.com',
      projectId: 'mh-client',
      storageBucket: 'mh-client.appspot.com',
      messagingSenderId: '985472354315'
    };
  }
}
