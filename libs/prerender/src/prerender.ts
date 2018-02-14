import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import * as fse from 'fs-extra';
import 'zone.js/dist/zone-node';
import { lsRoutes } from '../../lsroutes';
import { AppBundleUtils } from './app-bundle-utils';


export class Prerender {
  public static async print() {
    enableProdMode();
    const OUTPUT_DIR = `dist/morningharwood/bundle/`;
    const CSR_BUNDLE_DIR = `dist/apps/morningharwood/en-US`;
    const SSR_BUNDLE_DIR = `dist/apps/morningharwood-server/en-US`;
    const { document, hash } = await AppBundleUtils.getAppBundle(SSR_BUNDLE_DIR, CSR_BUNDLE_DIR);
    const bundle = `${process.cwd()}/${SSR_BUNDLE_DIR}/main.${hash}.bundle`;
    console.log(bundle);
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(bundle);
    console.log(AppServerModuleNgFactory, LAZY_MODULE_MAP);
    const urls = await lsRoutes('nestedPaths', AppServerModuleNgFactory, LAZY_MODULE_MAP);
    console.log(urls);

    //
    return await Promise.all(
      urls.map(async path => {
        const isEmptyPath = p => (p === '/' ? '/index.html' : `/${p}`);
        const url = isEmptyPath(path);
        const doc = await renderModuleFactory(AppServerModuleNgFactory, {
          document,
          url,
        });

        fse.writeFile(`${OUTPUT_DIR}${path}.html`, doc).then(() => console.log('done'));
      }),
    );
  }
}

Prerender.print();
