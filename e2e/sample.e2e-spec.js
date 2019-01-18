const nsAppium = require('nativescript-dev-appium')
const assert = require('chai').assert
const expect = require('chai').expect


describe("App Testing", () => {
  const defaultWaitTime = 5000;
  let driver;

  before(async () => {
    driver = await nsAppium.createDriver();
  });

  after(async () => {
    await driver.quit();
    console.log("Quit driver!");
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await driver.logTestArtifacts(this.currentTest.title);
    }
  });

  it('check platform is android', async () => {
    let platform = driver.isAndroid
    assert.isTrue(platform)
  })

  describe('')

  describe('Login Page', async () => {

    it("naviagte to Login page", async () => {
      let btnTap = await driver.findElementByText("Login with Email", nsAppium.SearchOptions.exact);
      await btnTap.tap();

      let loginPage = await driver.findElementByText("Login", nsAppium.SearchOptions.exact)
      await loginPage.waitForExist(200)

      assert.isTrue(await loginPage.isDisplayed())
    });

    it('should verify Login page', async () => {
      let emailLabel = await driver.findElementByText('Email Address', nsAppium.SearchOptions.exact)
      let passwordLabel = await driver.findElementByText('Password', nsAppium.SearchOptions.exact)

      // assert.isTrue(await emailLabel.isDisplayed())
      // assert.isTrue(await passwordLabel.isDisplayed())
      expect(await emailLabel.isDisplayed()).to.be.true
      expect(await passwordLabel.isDisplayed()).to.be.true

      let labels = await driver.findElementsByClassName(driver.locators.getElementByName('label'))

      // assert.equal(await labels.length, 5)
      expect(await labels.length).to.equal(5)
    })
  })



  // it("should find an element by type", async () => {

  // const message = " taps left";
  // const lblMessage = await driver.findElementByText(message, nsAppium.SearchOptions.contains);
  // assert.equal(await lblMessage.text(), "41" + message);

  // Image verification
  // const screen = await driver.compareScreen("hello-world-41");
  // assert.isTrue(screen);


  //     const btnTap = await driver.findElementByClassName(driver.locators.button);
  //     await btnTap.click();

  //     const message = " taps left";
  //     const lblMessage = await driver.findElementByText(message, nsAppium.SearchOptions.contains);
  //     assert.equal(await lblMessage.text(), "40" + message);
  // });



});