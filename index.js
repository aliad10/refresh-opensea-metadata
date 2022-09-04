var webdriver = require("selenium-webdriver");
const { collectionAddress, chainName } = require("./config");
const { By } = require("selenium-webdriver");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
(async function example() {
  let driver = await new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

  //item you want to auto refresh it's metadata
  let tokenId = 0;

  while (true) {
    try {
      await driver.get(
        `https://opensea.io/assets/${chainName}/${collectionAddress}/${tokenId}`
      );

      await driver
        .findElement(
          By.xpath(
            `//*[@id="main"]/div/div/div/div[1]/div/div[1]/div[2]/section[1]/div/div[2]/div/button[1]`
          )
        )
        .click();

      await sleep(30000);

      tokenId = tokenId + 1;
    } catch (e) {
      console.log("token", tokenId);
      await sleep(60000);
    }
  }
})();
