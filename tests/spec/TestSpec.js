
///////////

describe("MyDateTimeFix string param to Date result format", function() {
    beforeEach(function() {
        mDTF = new MyDateTimeFix;
    });

    it("function should exist", function() {
        expect(MyDateTimeFix).toBeDefined();
    });

    describe("Check Date Type function", function() {
        it("should return type object date when day is two digit 31", function() {
            mDTF.someFileAdjs("2018-07-31 22:00:00.000");
            expect(mDTF.dd).toBe('[object Date]');
        });
        
        it("should return type object date when day is one digit 9", function() {
            mDTF.someFileAdjs("2018-09-09 14:00:00.000");
            expect(mDTF.dd).toBe('[object Date]');
        });        
        
        it("should return an error if param is a Date Type, no substr func can work"
        , function() { 
            spyOn(window, "alert");
            mDTF.someFileAdjs(new Date("2018-07-31 22:00:00.000"));
            expect(window.alert).toHaveBeenCalledWith("Error creating Date");
        });        
        
    });
});

///////////

describe("arrCountry custom function map showing neigbouring countries", function() {
    beforeEach(function() {
        this.result = new arrCountr("CZ"); 
     });

    it("function should exist", function() {
        expect(arrCountr).toBeDefined();
    });

    it("should return true as it is the main hub not neighbour", function() {
        expect(this.result).not.toEqual(jasmine.objectContaining(["CZ"]));
    });

    it("should return 1 failure spec as it is a neighbour not main hub", function() {
        expect(this.result).not.toEqual(jasmine.objectContaining(["PL"]));
    });

    it("should return true all main Hub neighbours", function() {
        expect(this.result).toEqual(["PL", "DE", "SK", "AT"]);
    });
});

///////////

describe("show_day_P_composite_chart custom reduce function Price of SK Month 9 day 15", function() {
    beforeEach(function() {
        this.value = new p_composite_chart("SK");
    });
    
    it("function should exist", function() {
        expect(p_composite_chart).toBeDefined();
    });    
    
    it("should return true that 24 hours are counted. should return true that the average of SK for that day equals the data title of the chart", function() {
        expect(this.value.count).toEqual(24);
        expect(this.value.average).toEqual(69.00791666666669);
    });    
    
});

///////////