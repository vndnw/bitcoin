const fetch = require("node-fetch");
const fs = require("fs");

// URL API lấy giá Bitcoin
const apiUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Lấy giá Bitcoin
    const btc = data["bitcoin"]["usd"];
    console.log(`Current Bitcoin Price: $${btc}`);

    // Đọc nội dung từ file template.md
    let template = fs.readFileSync("template.md", "utf8");

    // Thay thế placeholder {BITCOIN} bằng giá Bitcoin
    const updatedContent = template.replace("{BITCOIN}", btc);

    // Ghi lại nội dung đã cập nhật vào README.md
    fs.writeFileSync("README.md", updatedContent);

    console.log("README.md has been updated with the latest Bitcoin price.");
  })
  .catch((error) => {
    console.error("Error fetching Bitcoin price:", error);
  });
