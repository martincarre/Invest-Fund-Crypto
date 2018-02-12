const fs = require("fs");

var date = formatDate(new Date());

function logRecord(e, ori) {
  var fileName = "./logs/" + date + ori + ".txt";

  fs.appendFile(fileName, JSON.stringify(e, null, 2), err => {
    if (err) console.log(err);
  });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

module.exports = {
  logRecord
};
