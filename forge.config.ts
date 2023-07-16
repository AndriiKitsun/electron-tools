import MakerSquirrel from '@electron-forge/maker-squirrel';
import MakerZIP from '@electron-forge/maker-zip';
import WebpackPlugin from '@electron-forge/plugin-webpack';
import AutoUnpackNativesPlugin from '@electron-forge/plugin-auto-unpack-natives';
import { rendererConfig } from './webpack.renderer.config';
import { mainConfig } from './webpack.main.config';
import MakerDeb from '@electron-forge/maker-deb';
import MakerRpm from '@electron-forge/maker-rpm';
import type { ForgeConfig } from '@electron-forge/shared-types';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({})
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/electron/renderer/index.html',
            js: './src/electron/renderer/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/electron/preload.ts'
            }
          }
        ]
      }
    })
  ]
};

export default config;
