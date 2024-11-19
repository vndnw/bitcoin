const fetch = require("node-fetch");
const fs = require("fs");

const apiUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const btcPrice = data.bitcoin.usd;
    console.log(`Bitcoin price fetched: $${btcPrice}`);

    let readme = fs.readFileSync("README.md", "utf8");
    readme = readme.replace(
      /Bitcoin Price: \$\d+(\.\d+)?/,
      `Bitcoin Price: $${btcPrice} USD`
    );
    fs.writeFileSync("README.md", readme);

    console.log("README.md has been updated.");
  })
  .catch((error) => {
    console.error("Error fetching Bitcoin price:", error);
    process.exit(1);
  });
