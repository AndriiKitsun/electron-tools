import type { Configuration } from 'webpack';
import CopyPlugin from "copy-webpack-plugin";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: './src/electron/main.ts',
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'dist/electron-tools',
          to: '../renderer/electron-tools',
        },
      ],
    }),
  ],
};
