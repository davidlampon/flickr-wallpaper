/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const should = require('chai').should();

const configFile = require('../config');
const flickrInterface = require('../index');

describe('#configFile', () => {
  it('should exist', () => {
    should.exist(configFile);
  });

  it('should be an object', () => {
    expect(configFile).to.be.an('object');
  });

  it('should have a personal ID', () => {
    expect(configFile).to.have.own.property('personalId').to.be.a('string').to.not.be.empty;
  });

  it('should have a Flickr object', () => {
    expect(configFile).to.have.own.property('flickr');
  });

  it('should have a Flickr object with all properties properly set', () => {
    const flickrObject = configFile.flickr;
    expect(flickrObject).to.have.own.property('apiKey').to.be.a('string');
    expect(flickrObject).to.have.own.property('apiSecret').to.be.a('string');
    expect(flickrObject).to.have.own.property('accessToken').to.be.a('string');
    expect(flickrObject).to.have.own.property('accessTokenSecret').to.be.a('string');
  });

  it('should have a Wallpaper array', () => {
    expect(configFile).to.have.own.property('wallpapers').to.be.a('array');
  });

  it('should have a Gallery array', () => {
    expect(configFile).to.have.own.property('galleries').to.be.a('array');
  });
});


describe('#flickrInterface', () => {
  it('should exist', () => {
    should.exist(flickrInterface);
  });

  it('should be an object', () => {
    expect(flickrInterface).to.be.an('object');
  });

  it('should have a getWallpaper method', () => {
    expect(flickrInterface).to.have.own.property('getWallpaper');
  });

  it('should have a getPictures method', () => {
    expect(flickrInterface).to.have.own.property('getPictures');
  });
});
