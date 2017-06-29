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

const getWallpaper = () => {
  randomAlbum = config.wallpapers[Math.floor(Math.random() * config.wallpapers.length)];

  flickr
    .request()
    .albums(randomAlbum)
    .media()
    .get({
      extras: 'original_format',
    })
    .then((response) => {
      responsePhoto = response.body.photoset.photo;
      photo = responsePhoto[Math.floor(Math.random() * responsePhoto.length)];
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;

      request
        .get(url)
        .on('error', (err) => {
          console.log(err);
        })
        .pipe(
        fs.createWriteStream(
          `${PLUGIN_FOLDER}/wallpaper.${photo.originalformat}`,
        ),
      );
    },
    (err) => {
      console.log(err);
    },
  );
};

const getPictures = () => {
  const tags = config.tags;

  randomAlbum =
    config.galleries[Math.floor(Math.random() * config.galleries.length)];

  flickr
    .request()
    .people(config.personalId)
    .media()
    .get({
      media: 'photos',
      tags: tags.join(),
      sort: 'date-taken-desc',
      extras: 'tags, date_taken, date_upload',
    })
    .then((response) => {
      responsePhoto = response.body.photos.photo;
      for (let i = 0; i < responsePhoto.length && tags.length; i += 1) {
        photo = responsePhoto[i];
        index = tags.indexOf(photo.tags);

        if (photo.tags && index > -1) {
          url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;

          request
            .get(url)
            .on('error', (err) => {
              console.log(err);
            })
            .pipe(fs.createWriteStream(`${PLUGIN_FOLDER}/${photo.tags}.jpg`));

          tags.splice(index, 1);
        }
      }
    },
    (err) => {
      console.log(err);
    },
  );
};

const init = () => {
  getPictures();
  getWallpaper();
};

init();


module.exports = {
  getPictures,
  getWallpaper,
};
