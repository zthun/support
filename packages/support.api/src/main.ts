/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ZNestApplication, ZNestApplicationModule } from '@zthun/works.nest';

@Module({
  imports: [ZNestApplicationModule]
})
/**
 * The main module.
 */
export class ZSupportMainModule {}

ZNestApplication.create(ZSupportMainModule)
  .then((app) => ZNestApplication.run(app))
  .catch((err) => console.error(err));
