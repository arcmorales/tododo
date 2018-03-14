var chakram = require('chakram'),
  expect = chakram.expect;

describe("Schema test", function() {

  var mockedSchema, partSchema;

  before("Define reference schema", function() {

    mockedSchema = {
      type: "object",
      properties: {
        "pv.irradiation": {
          type: "object",
          properties: {
            "unit": { type: "string" },
            "timestamp": { type: "number" },
            "value": { type: "number" }
          }
        },
        "pvinv.activepower": {
          type: "object",
          properties: {
            "unit": { type: "string" },
            "timestamp": { type: "number" },
            "value": { type: "number" }
          }
        },
        "pvinv.energy": {
          type: "object",
          properties: {
            "unit": { type: "string" },
            "timestamp": { type: "number" },
            "value": { type: "number" }
          }
        }
      }
    };

    partSchema = {
          type: "object",
          properties: {
            "unit": { type: "string" },
            "timestamp": { type: "number" },
            "value": { type: "boolean" }
          }
        
    };


  });


  it("should return 200 on success", function() {

    return chakram.get("http://demo9405120.mockable.io/power")
      .then(function(chalia) {
        expect(chalia).to.have.status(200);
      })
  });


  it("should respond with data matching schema", function() {
    return chakram.get("http://demo9405120.mockable.io/power")
      .then(function(chalia) {
        expect(chalia).to.have.schema(mockedSchema);
      })

  });

  it("should respond with data matching the child property of the schema", function() {
    let item = `pvinv\.energy`;
     return chakram.get("http://demo9405120.mockable.io/power")
      .then(function(chalia) {
        expect(chalia).to.have.schema(item, partSchema);
      })
  });

});