const app = require('../app');

function broadcastRealtimeUsageUpdate(plugId, data) {
  broadcast(generatePayload('realtimeUsage', plugId, data));
}

function broadcastDailyUsageUpdate(plugId, data) {
  broadcast(generatePayload('dailyUsage', plugId, data));
}

function broadcastMonthlyUsageUpdate(plugId, data) {
  broadcast(generatePayload('monthlyUsage', plugId, data));
}

function broadcastPowerStateUpdate(plugId, data) {
  broadcast(generatePayload('powerState', plugId, data));
}

function broadcastNewLogEntry(plugId, data) {
  broadcast(generatePayload('newLogEntry', plugId, data));
}

function broadcast(payload) {
  app.getWsClients().forEach(client => {
    client.send(payload);
  })
}

function generatePayload(dataType, plugId, data) {

  let payload = {
    dataType: dataType,
    plugId: plugId,
    data: data
  }

  return JSON.stringify(payload);
}


module.exports = {
  broadcastRealtimeUsageUpdate: broadcastRealtimeUsageUpdate,
  broadcastDailyUsageUpdate: broadcastDailyUsageUpdate,
  broadcastMonthlyUsageUpdate: broadcastMonthlyUsageUpdate,
  broadcastPowerStateUpdate: broadcastPowerStateUpdate,
  broadcastNewLogEntry: broadcastNewLogEntry,
  generatePayload: generatePayload
}
