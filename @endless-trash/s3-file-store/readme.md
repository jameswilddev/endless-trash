# `@endless-trash/s3-file-store` [![Continuous Integration](https://github.com/jameswilddev/endless-trash/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/endless-trash/actions) [![License](https://img.shields.io/github/license/jameswilddev/endless-trash.svg)](https://github.com/jameswilddev/endless-trash/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![npm](https://img.shields.io/npm/v/@endless-trash/s3-file-store.svg)](https://www.npmjs.com/package/@endless-trash/s3-file-store) [![npm type definitions](https://img.shields.io/npm/types/@endless-trash/s3-file-store.svg)](https://www.npmjs.com/package/@endless-trash/s3-file-store)

A file store backed by a S3 bucket.

## IAM Permissions

### initializeS3FileStore

- CreateBucket.

### S3FileStore

| Method    | IAM Permissions       |
| --------- | --------------------- |
| delete    | DeleteObject          |
| getUrl    | GetObject, ListBucket |
| listPaths | ListBucket            |
| save      | PutObject             |

## Dependencies

This package has the following runtime dependencies:

Name    | Version                                                                                      
------- | ---------------------------------------------------------------------------------------------
aws-sdk | [![2.820.0](https://img.shields.io/npm/v/aws-sdk.svg)](https://www.npmjs.com/package/aws-sdk)

## Peer Dependencies

This package has no runtime peer dependencies (it does not expect any other packages to be installed alongside itself).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash?ref=badge_large)
