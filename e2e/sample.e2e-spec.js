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

  describe('Facebook login test', async () => {
    const USERNAME = 'vanhop.pt@gmail.com'
    const PASSWORD = 'LINH@hop1'

    it('should facebook login via custom button', async () => {
      let fbButton = await driver.findElementByText("Facebook", nsAppium.SearchOptions.contains);
      await fbButton.tap();

      if (driver.isAndroid) {
        const allFields = await driver.findElementsByClassName(driver.locators.getElementByName('textfield'))
        await allFields[0].sendKeys(USERNAME);
        try {
          await driver.driver.hideDeviceKeyboard();
        } catch (error) { }
        await driver.wait(1000);
        await allFields[1].sendKeys(PASSWORD);
      } else {
        const usernameField = await driver.findElementByClassName(driver.locators.getElementByName("textfield"));
        await usernameField.click();
        await usernameField.sendKeys(USERNAME);
        const passField = await driver.findElementByClassName(driver.locators.getElementByName("securetextfield"));
        await passField.click();
        await passField.sendKeys(PASSWORD);
      }

      try {
        await driver.driver.hideDeviceKeyboard("Done");
      } catch (error) { }
      if (driver.isAndroid) {
        const logInButton = await driver.findElementByClassName(driver.locators.button);
        await logInButton.click();
        const continueButton = await driver.findElementByText("Continue");
        await continueButton.click();
      } else {
        const logInButton = await driver.findElementByText("Log In");
        await logInButton.click();
        const continueButton = await driver.findElementByText("Continue");
        await continueButton.click();
      }

    })

  })

  // describe('Login Page', async () => {

  //   it("naviagte to Login page", async () => {
  //     let btnTap = await driver.findElementByText("Login with Email", nsAppium.SearchOptions.exact);
  //     await btnTap.tap();

  //     let loginPage = await driver.findElementByText("Login", nsAppium.SearchOptions.exact)
  //     await loginPage.waitForExist(200)

  //     assert.isTrue(await loginPage.isDisplayed())
  //   });

  //   it('should verify Login page', async () => {
  //     let emailLabel = await driver.findElementByText('Email Address', nsAppium.SearchOptions.exact)
  //     let passwordLabel = await driver.findElementByText('Password', nsAppium.SearchOptions.exact)

  //     // assert.isTrue(await emailLabel.isDisplayed())
  //     // assert.isTrue(await passwordLabel.isDisplayed())
  //     expect(await emailLabel.isDisplayed()).to.be.true
  //     expect(await passwordLabel.isDisplayed()).to.be.true

  //     let labels = await driver.findElementsByClassName(driver.locators.getElementByName('label'))

  //     // assert.equal(await labels.length, 5)
  //     expect(await labels.length).to.equal(5)
  //   })
  // })



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


  // it('should scroll the list', async () => {
  //   let listView = await driver.findElementByClassName(driver.locators.getElementByName('listview'))
  // })

});