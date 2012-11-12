define(["jasmine", "JSONtoXML"], function (jasmine, __Module__) {
    describe("JSON <--> XML", function () {
        var JSONtoXML;

        beforeEach(function() {
            JSONtoXML = __Module__.JSONtoXML;
        });
        describe("To XML", function() {
            it("it should return a string", function(){
                var result = JSONtoXML.convertToXML({});
                expect(typeof result).toBe("string");
            });
            
            it("it should give us null if we pass in anything other than an object", function() {
                var result = JSONtoXML.convertToXML("");
                expect(result).toBeNull();
            });
            
            it("it should be able to convert a simple object without anything within it", function() {
                var result = JSONtoXML.convertToXML({"temp":{}});
                expect(result).toBe("<temp></temp>");
            });

            it("it should be able to convert an object with a single property", function() {
                var result = JSONtoXML.convertToXML({"temp":{"trace":"boom"}});
                expect(result).toBe("<temp trace=\"boom\"></temp>");
            });

            it("it should be able to convert an object with a single array property", function() {
                var result = JSONtoXML.convertToXML({"temp":{"child":[{"trace":"boom"}]}});
                expect(result).toBe("<temp><child trace=\"boom\"></child></temp>");
            });

            it("it should be able to convert an object with a single array which has a child object", function() {
                var result = JSONtoXML.convertToXML({"temp":{"child":[{"trace":{"tash":"boom"}}]}});
                expect(result).toBe("<temp><child><trace tash=\"boom\"></trace></child></temp>");
            });

            it("it should be able to convert an object with a child object", function() {
                var result = JSONtoXML.convertToXML({"temp":{"child":{}}});
                expect(result).toBe("<temp><child></child></temp>");
            });

            it("it should be able to add an xml header", function() {
                var result = JSONtoXML.convertToXML({"temp":{}}, true);
                expect(result).toBe("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<temp></temp>");
            })
        });
    });
});