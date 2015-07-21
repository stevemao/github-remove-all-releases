#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coverall-image]][coverall-url]

> Remove all releases of a GitHub repo

Useful when you need to scrap current releases and make new ones.


## Install

```sh
$ npm install --save github-remove-all-releases
```


## Usage

```js
var githubRemoveAllReleases = require('github-remove-all-releases');

var AUTH = {
  type: 'oauth',
  token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8'
};

githubRemoveAllReleases(AUTH, 'stevemaotest', 'github-remove-all-releases-test', callback);
```

```sh
$ npm install --global github-remove-all-releases
$ github-remove-all-releases --help

  Remove all releases of a GitHub repo

  Usage
    github-remove-all-releases <owner> <repo>

  Example
    github-remove-all-releases stevemao github-repo
    github-remove-all-releases stevemao github-repo -t cde5078435862fe1c8af8af4b582460b95e8ec30

  Options
    -t, --token      Your auth token
    -v, --verbose    Verbose output
```


## API

### githubRemoveAllReleases(auth, owner, repo, callback, [filter])

### auth

An auth object passed to [node-github](https://github.com/mikedeboer/node-github#authentication).

### owner

Type: `string`

The owner of the repo.

### repo

Type: `string`

The repo you want your releases deleted from.

### callback

#### function(err, data)

##### data

Type: `array`

A list of deleted releases.

### filter

Type: `function` Default: always return `true`

#### function(release)

A custom filter function. All the releases will be passed as the only argument of this function. If return `true`, this release will be removed.


## CLI

You can supply your auth token by a flag `-t` or `--token`. You can also [set up an environment variable](https://www.google.com.au/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=how%20to%20set%20environment%20variable) `CONVENTIONAL_GITHUB_RELEASER_TOKEN` to avoid typing your token every time. [Create a new token](https://github.com/settings/tokens/new) if you haven't.


## Grunt

See [grunt-github-remove-all-releases](https://github.com/stevemao/grunt-github-remove-all-releases).


## Related

- [conventional-github-releaser](https://github.com/stevemao/conventional-github-releaser) - Make a new GitHub release from git metadata
- [github-remove-forks](https://github.com/kevva/github-remove-forks) - Remove all forked repositories


## License

MIT © [Steve Mao](https://github.com/stevemao)


[npm-image]: https://badge.fury.io/js/github-remove-all-releases.svg
[npm-url]: https://npmjs.org/package/github-remove-all-releases
[travis-image]: https://travis-ci.org/stevemao/github-remove-all-releases.svg?branch=master
[travis-url]: https://travis-ci.org/stevemao/github-remove-all-releases
[daviddm-image]: https://david-dm.org/stevemao/github-remove-all-releases.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stevemao/github-remove-all-releases
[coverall-image]: https://coveralls.io/repos/stevemao/github-remove-all-releases/badge.svg
[coverall-url]: https://coveralls.io/r/stevemao/github-remove-all-releases
