import { DynamicModule, Module, Provider } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { HashTextService } from './'

const HASHING_MODULE_OPTIONS: symbol = Symbol('HASHING_MODULE_OPTIONS')

export interface IHashingOptions {
  secretKey: string
}

export type HashingModuleOptionsAsync = Pick<ModuleMetadata, 'imports'> & {
  useFactory: (...args: any[]) => Promise<IHashingOptions> | IHashingOptions
  inject?: any[]
  global: boolean
}

@Module({})
export class HashingModule {
  public static forRoot(options: IHashingOptions & { global: boolean }): DynamicModule {
    return {
      module: HashingModule,
      providers: [{
        provide: HashTextService,
        useValue: new HashTextService(options)
      }],
      exports: [HashTextService],
      global: options.global,
    }
  }

  public static forRootAsync(
    options: HashingModuleOptionsAsync
  ): DynamicModule {
    const hashModuleProvider: Provider = {
      provide: HASHING_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }

    const hashTextProvider: Provider = {
      provide: HashTextService,
      useFactory: (options: IHashingOptions) => {
        return new HashTextService(options)
      },
      inject: [HASHING_MODULE_OPTIONS],
    }

    return {
      module: HashingModule,
      imports: [...(options.imports || [])],
      providers: [hashModuleProvider, hashTextProvider],
      exports: [HashTextService],
      global: options.global || false,
    }
  }
}
