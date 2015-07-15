#!/usr/bin/env node
'use strict';
var meow = require('meow');
var githubRemoveAllReleases = require('./');

var cli = meow({
  help: [
    'Usage',
    '  github-remove-all-releases <owner> <repo>',
    '',
    'Example',
    '  github-remove-all-releases stevemao github-repo',
    '  github-remove-all-releases stevemao github-repo -t cde5078435862fe1c8af8af4b582460b95e8ec30',
    '',
    'Options',
    '  -t, --token      Your auth token',
    '  -v, --verbose    Verbose output'
  ]
}, {
  alias: {
    t: 'token',
    v: 'verbose'
  }
});

var input = cli.input;
var flags = cli.flags;

try {
  githubRemoveAllReleases({
    type: 'oauth',
    token: flags.token || process.env.GITHUB_REMOVE_ALL_RELEASES_TOKEN
  }, input[0], input[1], function(err, data) {
    if (err) {
      console.error(err.toString());
      process.exit(1);
    }

    if (flags.verbose) {
      console.log(data);
    }
  });
} catch (err) {
  console.error(err.toString());
  process.exit(1);
}
