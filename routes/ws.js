const express = require('express');
const router = express.Router();

const deviceManager = require('../services/device-manager');
const dataFetcher = require('../services/data-fetcher');
const dataBroadcaster = require('../services/data-broadcaster');
const dataLogger = require('../services/data-logger.js');

router.ws('/', function(ws, req) {

  ws.on('message', msg => {

    let message = JSON.parse(msg);

    // Latest data is always pushed out to clients, but clients can also request cached data at any time.
    if(message.requestType === 'getCachedData') {
      let plugId = message.plugId;
      let cachedData = dataFetcher.getCachedData(plugId);
      
      ws.send(dataBroadcaster.generatePayload('realtimeUsage', plugId, cachedData.realtimeUsage));
      ws.send(dataBroadcaster.generatePayload('dailyUsage', plugId, cachedData.dailyUsage));
      ws.send(dataBroadcaster.generatePayload('monthlyUsage', plugId, cachedData.monthlyUsage));
      ws.send(dataBroadcaster.generatePayload('powerState', plugId, cachedData.powerState));
      dataLogger.getLogEntriesForDevice(plugId, (loggedData) => {
        ws.send(dataBroadcaster.generatePayload('loggedData', plugId, loggedData));
      });
      
    }
  });

});

module.exports = router;
