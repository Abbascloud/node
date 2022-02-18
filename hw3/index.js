const fs = require("fs");

const ACCESS_LOG = "./access.log";

const FILTERED_FIRST_LOG = "./34.48.240.111_requests.log";

const FILTERED_SECOND_LOG = "./89.123.1.41_requests.log";

const readStream = fs.createReadStream(ACCESS_LOG, { encoding: "utf-8" });
readStream.on("data", (chunk) => {
  let logs = chunk.match(/^89\.123\.1\.41.+|34\.48\.240\.111.+$/gm);

  let FILTERED_LOG = "";

  logs.forEach((filteredString) => {
    if (/^34\.48\.240\.111.+$/.test(filteredString)) {
      FILTERED_LOG = FILTERED_FIRST_LOG;
    }

    if (/^89\.123\.1\.41.+$/.test(filteredString)) {
      FILTERED_LOG = FILTERED_SECOND_LOG;
    }

    fs.writeFile(
      FILTERED_LOG,
      filteredString + "\n",
      { encoding: "utf-8", flag: "a" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

// /^89\.123\.1\.41.+$/gm
// /^34\.48\.240\.111.+$/gm

// /^89\.123\.1\.41.+|34\.48\.240\.111.+$/gm
