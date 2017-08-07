/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

const Flickr = require('flickr-sdk');
const fs = require('fs');
const request = require('request');
const config = require('./config.js');

const PLUGIN_FOLDER = 'lr-latest.widget';

const flickr = new Flickr(config.flickr);

let randomAlbum;
let responsePhoto;
let photo;
let url;
let index;

const _createFolder = () => {
  if (!fs.existsSync(`./${PLUGIN_FOLDER}`)){
      fs.mkdirSync(`./${PLUGIN_FOLDER}`);
  }
};

const _saveWallpaper = (response) => {
  _createFolder();
  responsePhoto = response.body.photoset.photo;
  photo = responsePhoto[Math.floor(Math.random() * responsePhoto.length)];
  url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
  request(url).pipe(fs.createWriteStream(`${PLUGIN_FOLDER}/wallpaper.${photo.originalformat}`));
};

const _processWallpaper = (promise) => {
  promise
    .then(_saveWallpaper);
};

const _retrieveWallpaper = (randomAlbum) => {    
  return flickr
    .request()
    .albums(randomAlbum)
    .media()
    .get({
      extras: 'original_format',
    });   
};

const getWallpaper = () => {
  randomAlbum = config.wallpapers[Math.floor(Math.random() * config.wallpapers.length)];
  _processWallpaper(_retrieveWallpaper(randomAlbum)); 
};

const _savePictures = (response) => {  
  let tags = config.tags;
  responsePhoto = response.body.photos.photo;

  _createFolder();

  for (let i = 0; i < responsePhoto.length && tags.length; i += 1) {
    photo = responsePhoto[i];
    index = config.tags.indexOf(photo.tags);

    if (photo.tags && index > -1) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
      request(url).pipe(fs.createWriteStream(`${PLUGIN_FOLDER}/${photo.tags}.jpg`));
      tags.splice(index, 1);
    }
  }
};

const _processPictures = (promise) => {
  promise
    .then(_savePictures);
};

const _retrievePictures = () => {    
  return flickr
    .request()
    .people(config.personalId)
    .media()
    .get({
      media: 'photos',
      tags: config.tags.join(),
      sort: 'date-taken-desc',
      extras: 'tags, date_taken, date_upload',
    });
};

const getPictures = () => {
  // randomAlbum = config.galleries[Math.floor(Math.random() * config.galleries.length)];  
  _processPictures(_retrievePictures());
};

const init = () => {
  getPictures();
  getWallpaper();
};

init();

module.exports = {
  _createFolder,
  _saveWallpaper,
  _savePictures,
  _retrieveWallpaper,
  _retrievePictures,
  getWallpaper,
  getPictures,
  
};
