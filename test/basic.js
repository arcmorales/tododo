var chakram = require('chakram'),
    expect = chakram.expect;

var fs = require('fs');
var jsonResults = [];


describe("New basic test", function () {
    before("Initializing headers", function () {
        // chakram.setRequestDefaults({
        //     strictSSL: false
        // });

        specifiedThingName = 'chakram-test-thing';
        initialDweetData = {
            description: "test sending a string",
            sensorValue: 0.2222,
            alert: true
        };
        namedDweetPost = chakram.post("https://dweet.io/dweet/for/"+specifiedThingName, initialDweetData);
   
    });

    afterEach("Get test result", function () {
        var logger = [
        {
            "describe": this.currentTest.parent.title,
            "it_block": this.currentTest.title,
            "test_state": this.currentTest.state,
            "test_duration": this.currentTest.duration
        }]

        jsonResults.push(logger)

    })

    after("Log test result to file", function () {
        fs.writeFile("writeFile.json", JSON.stringify(jsonResults, null, 1), function (err,data) {
            if (err) {
                throw err;
            }
        })
    })


    it("should return 200 on success", function () {
        return expect(namedDweetPost).to.have.status(200);
    });
    
    it("should specify success in the response 'this' field", function () {
        return expect(namedDweetPost).to.have.json('this', 'succeeded');
    });
    
    it("should respond with the created dweet's data", function () {
        return expect(namedDweetPost).to.have.json('with.content', initialDweetData);
    });

    it("should use a dweet thing name if provided", function () {
        return expect(namedDweetPost).to.have.json('with.thing', specifiedThingName);
    });
    
    it("should allow retrieval of the last data point", function () {
        var dataRetrieval = chakram.get("https://dweet.io/get/latest/dweet/for/"+specifiedThingName);
        return expect(dataRetrieval).to.have.json('with[0].content', initialDweetData);
    });
    
    it("should respond with data matching the dweet schema", function () {
        var expectedSchema = {
            type: "object",
            properties: {
                this: {type: "string"},
                by: {type: "string"},
                the: {type: "string"},
                with: {
                    type: "object",
                    properties: {
                        thing: {type: "string"},
                        created: {type: "string"},
                        content: {type: "object"}
                    },
                    required: ["thing", "created", "content"]
                }
            },
            required: ["this", "by", "the", "with"]
        };
        return expect(namedDweetPost).to.have.schema(expectedSchema);
    });

});

