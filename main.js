import fetch from "node-fetch";
import fs from "fs";

async function fetchBitcoinPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();
    const price = data.bitcoin?.usd;

    if (!price) {
      console.error("Failed to fetch Bitcoin price.");
      process.exit(1);
    }

    console.log(`Fetched Bitcoin Price: $${price}`);

    // Update README.md
    const readmePath = "./README.md";
    const readmeContent = fs.readFileSync(readmePath, "utf8");
    console.log("Current README.md content:", readmeContent);

    const updatedContent = readmeContent.replace(
      /\*\*Bitcoin Price:\*\* \$[0-9.,]*/g,
      `**Bitcoin Price:** $${price}`
    );
    console.log("Updated README.md content:", updatedContent);

    fs.writeFileSync(readmePath, updatedContent);
    console.log("README.md updated successfully.");
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    process.exit(1);
  }
}

fetchBitcoinPrice();
