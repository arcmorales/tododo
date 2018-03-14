var chakram = require('chakram'),
    expect = chakram.expect;

describe("Schema test", function () {

    var mockedSchema;

    before("Define reference schema", function () {
       mockedSchema = {
        type: "object",
        properties: {
            "pv.irradiation": {
                type: "object",
                properties: {
                    "unit" : {type: "string"},
                    "timestamp": {type: "number"},
                    "value" : {type: "number"}
                }
            },
             "pvinv.activepower": {
                type: "object",
                properties: {
                    "unit" : {type: "string"},
                    "timestamp": {type: "number"},
                    "value" : {type: "number"}
                }
            },
            "pvinv.energy": {
                type: "object",
                properties: {
                    "unit" : {type: "string"},
                    "timestamp": {type: "number"},
                    "value" : {type: "number"}
                }
            }
        }
       }
    })



    it("should return 200 on success", function () {
        
        return chakram.get("http://demo9405120.mockable.io/power")
        .then(function (chalia) {
            expect(chalia).to.have.status(200);      
        })
    });
    
    // it("should specify success in the response 'this' field", function () {
    //     return expect(namedDweetPost).to.have.json('this', 'succeeded');
    // });
    
    // it("should respond with the created dweet's data", function () {
    //     return expect(namedDweetPost).to.have.json('with.content', initialDweetData);
    // });

    // it("should use a dweet thing name if provided", function () {
    //     return expect(namedDweetPost).to.have.json('with.thing', specifiedThingName);
    // });
    
    // it("should allow retrieval of the last data point", function () {
    //     var dataRetrieval = chakram.get("https://dweet.io/get/latest/dweet/for/"+specifiedThingName);
    //     return expect(dataRetrieval).to.have.json('with[0].content', initialDweetData);
    // });
    
    it("should respond with data matching schema", function (){
        return chakram.get("http://demo9405120.mockable.io/power")
        .then(function (chalia) {
            expect(chalia).to.have.schema(mockedSchema);
        })
        
    });

});

