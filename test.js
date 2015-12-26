'use strict';
var expect = require('chai').expect;
var Github = require('github');
var githubRemoveAllReleases = require('./');
var Q = require('q');

var github = new Github({
  version: '3.0.0'
});

var AUTH = {
  type: 'oauth',
  token: process.env.TEST_GITHUB_REMOVE_ALL_RELEASES_TOKEN
};

github.authenticate(AUTH);

before(function(done) {
  githubRemoveAllReleases(AUTH, 'stevemaotest', 'github-remove-all-releases-test', function() {
    var createReleasePromises = [];

    createReleasePromises.push(Q.nfcall(github.releases.createRelease, {
      // jscs:disable
      owner: 'stevemaotest',
      repo: 'github-remove-all-releases-test',
      tag_name: 'this_is_the_first_tag',
      body: 'My_Body :D'
      // jscs:enable
    }));

    createReleasePromises.push(Q.nfcall(github.releases.createRelease, {
      // jscs:disable
      owner: 'stevemaotest',
      repo: 'github-remove-all-releases-test',
      tag_name: 'this_is_the_second_tag',
      body: 'My_Body :D',
      draft: true
      // jscs:enable
    }));

    createReleasePromises.push(Q.nfcall(github.releases.createRelease, {
      // jscs:disable
      owner: 'stevemaotest',
      repo: 'github-remove-all-releases-test',
      tag_name: 'this_is_the_third_tag',
      body: 'My_Body :D',
      prerelease: true
      // jscs:enable
    }));

    Q.all(createReleasePromises)
      .then(function() {
        console.log('Created three releases');
        done();
      }, function(err) {
        done(err);
      });
  });
});

it('should remove the draft release', function(done) {
  githubRemoveAllReleases(AUTH, 'stevemaotest', 'github-remove-all-releases-test', function(err, data) {
    expect(err).to.equal(null);
    expect(data.length).to.equal(1);
    github.releases.listReleases({
      // jscs:disable
      owner: 'stevemaotest',
      repo: 'github-remove-all-releases-test'
      // jscs:enable
    }, function(err, data) {
      expect(data.length).to.equal(2);
      done();
    });
  }, function(release) {
    return release.draft;
  });
});

it('should remove all releases', function(done) {
  githubRemoveAllReleases(AUTH, 'stevemaotest', 'github-remove-all-releases-test', function(err, data) {
    expect(err).to.equal(null);
    expect(data.length).to.equal(2);
    github.releases.listReleases({
      // jscs:disable
      owner: 'stevemaotest',
      repo: 'github-remove-all-releases-test'
      // jscs:enable
    }, function(err, data) {
      expect(data.length).to.equal(0);
      done();
    });
  });
});

it('should error if no releases found', function(done) {
  githubRemoveAllReleases(AUTH, 'stevemaotest', 'github-remove-all-releases-test', function(err) {
    expect(err.message).to.equal('No releases found');
    done();
  });
});

it('should throw if arguments are wrong', function() {
  expect(function() {
    githubRemoveAllReleases();
  }).to.throw();

  expect(function() {
    githubRemoveAllReleases({});
  }).to.throw();

  expect(function() {
    githubRemoveAllReleases({}, 'repo');
  }).to.throw();

  expect(function() {
    githubRemoveAllReleases({}, 'owner', 'repo');
  }).to.throw();
});
