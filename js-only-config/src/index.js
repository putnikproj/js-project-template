import { log } from './modules/module';

log();

class Test {
  constructor() {
    this.test = 'test';
  }

  log() {
    console.log(this.test);
  }
}

const test = new Test();
test.log();
