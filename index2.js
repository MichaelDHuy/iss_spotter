const { nextISSTimesForMyLocation } = require("./iss_promised");


const printPassTimes = function(passTimes) {
  for (const value of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(value.risetime);
    const duration = value.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
