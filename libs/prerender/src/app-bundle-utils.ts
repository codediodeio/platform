import * as fse from 'fs-extra';

export interface IAppBundle {
  document: string;
  files: string[];
  hash: string;
}

export class AppBundleUtils {
  public static async getAppBundle(ssrpath: string, csrpath: string, name?: string): Promise<IAppBundle> {
    const document = await AppBundleUtils.readBundleIndex(csrpath);
    const files = await AppBundleUtils.readBundleDir(ssrpath);
    const hash = AppBundleUtils.findHash(files, name);
    return {
      document,
      files,
      hash
    };
  }

  public static findHash(files: string[], name: string = 'main'): string {
    return files.find(file => file.startsWith(name)).split('.')[1];
  }

  public static readBundleDir(dir: string): Promise<string[]> {
    return fse.readdir(`${process.cwd()}/${dir}`);
  }

  public static async readBundleIndex(dir: string): Promise<string> {
    const filePath = `${process.cwd()}/${dir}/index.html`;
    return fse.readFile(filePath, 'utf8');
  }
}
