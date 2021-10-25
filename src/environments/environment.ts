// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API:{
    spotify: {
      baseUrl: 'https://api.spotify.com/',
      authUrl: 'https://accounts.spotify.com/',
      client_id: '9eae482895134832ab71765d128fd90f',
      redirect_uri: 'http://localhost:4200/',
      client_secret: '659bd4d4a73f4c91ab5284a855823150',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
