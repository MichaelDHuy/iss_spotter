const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});
const IP = "99.199.136.180";
fetchCoordsByIP (IP, (error, coordinates) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('It worked! Return coordinates:', coordinates);
  });

  const coords = { latitude: "49.2488091", longitude: "-122.9805104" };
  
  fetchISSFlyOverTimes(coords, (error, passTimes) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned flyover times:' , passTimes);
  });

  const passTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    console.log(passTimes);
  });