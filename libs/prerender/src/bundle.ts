import { exec } from 'child_process';


export class Bundle {
  public static async start() {
    const apps = [
      'morningharwood',
      'morningharwood-server',
    ];
    const locales = [ 'en-US' ];

    const buildsCommand = (locale, app) => {
      const template = `ng build --output-path=dist/apps/${app}/${locale} \
            --aot \
            -prod \
            --base-href ${locale} \
            --app=${app} \
            --i18n-file=./apps/${apps[ 0 ]}/i18n/messages.${locale}.xlf \
            --i18n-format=xlf \
            --locale=${locale}; \ 
            --missing-translation error \
            --progress=true \
            --delete-output-path=true \
            --verbose \
      `;

      console.log(template);
      return template;
    };
    // TODO make this a promise ALL and use a map
    for(const app of apps) {
      for(const locale of locales) {
        exec(buildsCommand(locale, app), (err, stdout, stderr) => {
          if(err) {
            console.log(err);
            return;
          }

          if(stdout) {
            console.log(`app ${app} in ${locale} is done!`);
          }

          if(stderr) {
            console.log('stderr', stderr);
          }
        });
      }
    }
  }
}

Bundle.start();
