# Mercury Hashing
#### A simple NestJS module package for encoding/decoding string.

## Install
```shell
npm install --save @mercury-labs/hashing
```

## Register
```typescript
HashingModule.forRoot({
  secretKey: 'GOo7cVgnCBnR8TvXIgvamXNb85cPVtJi',
})
```

## Register async
```typescript
HashingModule.forRootAsync({
  useFactory: (config: ConfigService) => {
    return {
      secretKey: config.get('HASHING_SECRET_KEY') || '',
    }
  },
  inject: [ConfigService],
})
```

#### Notes:
- The `secretKey` should be 32 characters string.

## Sample usages
```typescript
// import { HashTextService } from '@mercury/hashing'

export class TestService {
  public constructor(private readonly _hashTextService: HashTextService) {
  }

  public sample() {
    const hashed = this._hashTextService.encode('Duy SOLO')

    const decoded = this._hashTextService.decode(hashed)

    return {
      hashed,
      decoded
    }
  }
}
```