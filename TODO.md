# Fix Plan for Categories & Farmers Modules

## Errors Identified

1. `categories.service.ts` — Wrong entity import path (`./category.entity` instead of `./entities/categories.entity`)
2. `categories.module.ts` — Missing `TypeOrmModule.forFeature([Categories])`
3. `farmers.service.ts` — Syntax typo (`constructoronstructor`) + wrong import path (`./farmer.entity` instead of `./entities/farmers.entity`)
4. `farmers.module.ts` — Missing `TypeOrmModule.forFeature([Farmer])`
5. `categories.entity.ts` — Invalid TypeORM column type (`'number'` should be `'int'`)
6. `tsconfig.json` — `module`/`moduleResolution` set to `nodenext` may cause issues; change to `commonjs`/`node`

## Progress

- [x] Fix categories.service.ts import path
- [x] Fix categories.module.ts TypeOrmModule
- [x] Fix farmers.service.ts typo and import
- [x] Fix farmers.module.ts TypeOrmModule
- [x] Fix categories.entity.ts column type
- [x] Fix tsconfig.json module settings

## Status: COMPLETE
