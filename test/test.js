/* eslint-disable no-unused-expressions */
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');

const config = require('../config');
const flickrInterface = require('../index');

chai.use(chaiAsPromised);

describe('#config', () => {
  it('should exist', () => {
    should.exist(config);
  });

  it('should be an object', () => {
    expect(config).to.be.an('object');
  });

  it('should have a personal ID', () => {
    expect(config).to.have.own.property('personalId').to.be.a('string').to
      .not.be.empty;
  });

  it('should have a Flickr object', () => {
    expect(config).to.have.own.property('flickr');
  });

  it('should have a Flickr object with all properties properly set', () => {
    const flickrObject = config.flickr;
    expect(flickrObject).to.have.own.property('apiKey').to.be.a('string');
    expect(flickrObject).to.have.own.property('apiSecret').to.be.a('string');
    expect(flickrObject).to.have.own.property('accessToken').to.be.a('string');
    expect(flickrObject).to.have.own.property('accessTokenSecret').to.be.a('string');
  });

  it('should have a Wallpaper array', () => {
    expect(config).to.have.own.property('wallpapers').to.be.a('array');
  });

  it('should have a Gallery array', () => {
    expect(config).to.have.own.property('galleries').to.be.a('array');
  });
});

describe('#flickrInterface', () => {
  it('should exist', () => {
    should.exist(flickrInterface);
  });

  it('should be an object', () => {
    expect(flickrInterface).to.be.an('object');
  });

  it('should have a _createFolder method', () => {
    expect(flickrInterface).to.have.own.property('_createFolder');
  });

  it('should have a _saveWallpaper method', () => {
    expect(flickrInterface).to.have.own.property('_saveWallpaper');
  });

  it('should have a _retrieveWallpaper method', () => {
    expect(flickrInterface).to.have.own.property('_retrieveWallpaper');
  });

  it('should have a _retrieveWallpaper method than returns an object', () => {
    const randomAlbum = config.wallpapers[Math.floor(Math.random() * config.wallpapers.length)];
    return expect(flickrInterface._retrieveWallpaper(randomAlbum)).to.eventually.be.an('object');
  });

  it('should have a getWallpaper method', () => {
    expect(flickrInterface).to.have.own.property('getWallpaper');
  });

  it('should have a _savePictures method', () => {
    expect(flickrInterface).to.have.own.property('_savePictures');
  });

  it('should have a _retrievePictures method', () => {
    expect(flickrInterface).to.have.own.property('_retrievePictures');
  });

  it('should have a _retrievePictures method than returns an object', () => {
    const tags = config.tags;
    return expect(flickrInterface._retrievePictures(tags)).to.eventually.be.an('object');
  });

  it('should have a getPictures method', () => {
    expect(flickrInterface).to.have.own.property('getPictures');
  });  
});
