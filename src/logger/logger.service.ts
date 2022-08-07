import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  async log(message: any) {
    super.log(message);
  }

  async error(message: any) {
    super.error(message);
  }

  async verbose(message: any) {
    super.verbose(message);
  }

  async warn(message: any) {
    super.verbose(message);
  }

  async debug(message: any) {
    super.debug(message);
  }
}
