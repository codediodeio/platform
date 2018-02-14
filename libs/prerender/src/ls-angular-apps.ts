import * as fse from 'fs-extra';
import * as _ from 'lodash';

export interface IAngularConfigApp {
  name?: string;
}

export interface IAngularConfig {
  apps: IAngularConfigApp[];
}

const CFG_PATH = './.angular-cli.json';

export class LsAngularApps {
  public static async testPath(path = CFG_PATH): Promise<string> {
    const exist = await fse.pathExists(path);
    if (exist) {
      return path;
    } else {
      throw new Error(`Cannot find path for angular cli`);
    }
  }

  public static async getAngularJSON(path = CFG_PATH): Promise<IAngularConfig> {
    const angularAppPath = await LsAngularApps.testPath(path);
    return await fse.readJson(angularAppPath).catch(err => {
      Error(`${err}: Something when wrong reading json`);
    });
  }

  public static mapAppNames(apps: IAngularConfigApp[]): Array<string | number> {
    return apps.map((item, index) => {
      return _.get(item, 'name', index);
    });
  }
}

(async () => {
  const angularAppPath = await LsAngularApps.getAngularJSON();
  console.log(LsAngularApps.mapAppNames(angularAppPath.apps));
})();
