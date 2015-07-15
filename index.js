'use strict';
var Github = require('github');
var Q = require('q');

var github = new Github({
  version: '3.0.0'
});

function githubRemoveAllReleases(auth, owner, repo, done, filter) {
  if (!auth) {
    throw new Error('Expected an auth object');
  }

  if (typeof owner !== 'string') {
    throw new Error('owner must be a string');
  }

  if (typeof repo !== 'string') {
    throw new Error('repo must be a string');
  }

  if (typeof done !== 'function') {
    throw new Error('Expected a callback');
  }

  if (typeof filter !== 'function') {
    filter = function() {
      return true;
    };
  }

  github.authenticate(auth);

  Q.nfcall(github.releases.listReleases, {
    owner: owner,
    repo: repo
  })
    .then(function(data) {
      var deleteReleasePromises = [];

      if (data.length === 0) {
        throw new Error('No releases found');
      }

      data.forEach(function(release) {
        if (filter(release)) {
          deleteReleasePromises.push(Q.nfcall(github.releases.deleteRelease, {
            owner: owner,
            repo: repo,
            id: release.id
          }));
        }
      });

      return Q.allSettled(deleteReleasePromises);
    })
    .then(function(data) {
      setImmediate(done, null, data);
    }, function(err) {
      setImmediate(done, err);
    });
}

module.exports = githubRemoveAllReleases;
