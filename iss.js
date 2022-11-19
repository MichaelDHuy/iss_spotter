const request = require('request');

const fetchMyIP = function (callback) {
  let url = "https://api64.ipify.org?format=json";
request(url, (error, response, body) => {
  if (error) { // if error causes 
    return callback(error, null);
  }
   // if non-200 status,  server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  const myIP = JSON.parse(body).ip;
  callback(null, myIP);
});
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
    }
    const { latitude, longitude } = parsedBody;
    callback (null, { latitude, longitude });
})
}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
fetchMyIP((error, ip) => {
  if (error) {
    return callback(error, null);
  }
  
  fetchCoordsByIP(ip, (error, loc) => {
    if (error) {
      return callback(error, null);
    }

    fetchISSFlyOverTimes(loc, (error, nextPasses) => {
      if (error) {
        return callback(error, null);
      }

    callback(null, nextPasses);
    });
  });
});
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
