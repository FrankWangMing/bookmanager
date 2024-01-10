import { Module } from '@nestjs/common'
import { SupplierResolver } from './supplier.resolver'

@Module({
  providers: [SupplierResolver]
})
export class SupplierModule {}
