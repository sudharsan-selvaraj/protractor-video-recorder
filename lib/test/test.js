describe("", function () {
    beforeAll(function (done) {
        browser.ignoreSynchronization = true;
        browser.get("https://localhost:5050");
        browser.sleep(2000);
        browser.executeScript("return window.name").then(function (clientId) {
            console.log(clientId);
            done();
        })
    });

    it("",function () {
        var robot = require("robotjs");
        browser.sleep(2000);
        browser.takeScreenshot();
        browser.sleep(2000);
       // ks.sendCombination(['ctrl', 'shift', 'f']);
        robot.keyTap("f",["alt","shift"])
    })
    it("", function () {
        var hotkeys = require('protractor-hotkeys');
        hotkeys.trigger('alt+shift+f');
        browser.sleep(2000);
    });
});