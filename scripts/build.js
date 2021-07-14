/* eslint-disable no-undef */
/* eslint no-console: 0 */
// const fse = require('fs-extra');
const path = require('path');
// const colors = require('colors');
// const { execSync } = require('child_process');

class WebpackBuild {
  constructor() {
    // this.server = process.env.ENV || 'prod';
    // this.serverConfig = require(path.resolve(`./config/servers/${this.server}.config`));
    // this.distPath = path.resolve('./dist');
    // this.tarPath = `${this.distPath}/voice-robot-mobile.tar.gz`;
    // process.env.SERVER_ENV = this.server;
    // process.env.NODE_ENV = 'production';
  }

  run() {
    // this.removeDistFolder();
    this.build();
    // this.pack();
  }

  // removeDistFolder() {
  //   console.log(colors.green(`Remove dist folder!\n`));
  //   fse.removeSync(this.distPath);
  // }

  build() {
    console.log(process.argv);
    console.log();
    // execSync('webpack --config webpack.prod.config.js', { stdio: 'inherit' });
  }

  // pack() {
  //   console.log(colors.green(`Pack project!\n`));
  //   execSync(`tar -czvf ${this.tarPath} -C ./dist ${this.serverConfig.buildPath}`, { stdio: 'inherit' });
  // }
}

new WebpackBuild().run();
