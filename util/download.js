const https = require("https");
const fs = require("fs");

module.exports = {
    downloadFile: async function(url, targetFile) {
        return await new Promise((resolve, reject) => {
          https
            .get(url, (response) => {
              const code = response.statusCode ?? 0;
              if (code >= 400) {
                return reject(new Error(response.statusMessage));
              }
              if (code > 300 && code < 400 && !!response.headers.location) {
                return this.downloadFile(response.headers.location, targetFile);
              }
              const fileWriter = fs.createWriteStream(targetFile).on("finish", () => {
                resolve({});
              });
              response.pipe(fileWriter);
            })
            .on("error", (error) => {
              reject(error);
            });
        });
      }
}