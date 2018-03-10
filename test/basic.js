var chakram = require('chakram'),
    expect = chakram.expect;
    var Mocha = require('mocha')
    var mocha = new Mocha({
        reporter: 'mochawesome'
      });

describe("Basic test", function () {
    before("Initializing headers", function () {
        chakram.setRequestDefaults({
            strictSSL: false
        });
    });

    it("should do a basic get test", function () {
        return getStat = chakram.get("", )
            .then(function (searchResponse) {
                expect(searchResponse).to.have.status(200);
                console.log(searchResponse)
                return chakram.wait();
            });
    });
    it("should do a basic get test - not promised", function () {
        var getStat = chakram.get("", )
        return expect(getStat).to.have.status(400);
        console.log(getStat)
    });

});

