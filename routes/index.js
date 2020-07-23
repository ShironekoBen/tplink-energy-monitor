const express = require('express');
const router = express.Router();

const deviceManager = require('../services/device-manager');

router.get('/', function(req, res, next) {

  let devices = sortDevices(deviceManager.getAllDevices());

  if (devices && devices.length > 0) {
    let plugId = devices[0].id;

    res.redirect('/' + plugId);
  } else {
    res.render('index', {});
  }

});

router.get('/:plugId', function(req, res, next) {

  let plugId = req.params.plugId;

  res.render('index', {
    device: deviceManager.getDevice(plugId),
    devices: sortDevices(deviceManager.getAllDevices())
  });

});

function sortDevices(devices) {
  return devices.slice().sort((a, b) => {
    return a.alias.toLowerCase().localeCompare(b.alias.toLowerCase())
  })
}

module.exports = router;
