
///////////

const MyDateTimeFix = function() {
    this.dd = "";
};

MyDateTimeFix.prototype.someFileAdjs = function(DateTimeStr) {
    try {
        const tempDD = DateTimeStr;
        const helpY = parseInt(tempDD.substr(0,4));const helpM = parseInt(tempDD.substr(5,2));            
        const helpD = parseInt(tempDD.substr(8,2));const helpH = parseInt(tempDD.substr(11,2));
                
        const ddate = new Date(helpY,helpM-1,helpD,helpH,0,0);
            
        if ((ddate instanceof Date) && !isNaN(ddate)) {
            this.dd = '[object Date]';            
        }
    }
    catch(err) {
        alert("Error creating Date");
    }
};

///////////

function arrCountr(myCountry) {
    let myCFData =[];
    
    const d1 = {
        Day: 1,
        Hour: 17,
        InMapCode: "CZ",
        Month: 9,
        OutMapCode: "PL",
        Quantity: 0,
        Service: "Co",
        Type: "I",
        Year: 2018
    };
        
    const d2 = {
        Day: 2,
        Hour: 15,
        InMapCode: "CZ",
        Month: 9,
        OutMapCode: "DE",
        Quantity: -477,
        Service: "Co",
        Type: "I",
        Year: 2018
    };
        
    const d3 = {
        Day: 1,
        Hour: 10,
        InMapCode: "CZ",
        Month: 9,
        OutMapCode: "SK",
        Quantity: -674.2,
        Service: "Co",
        Type: "I",
        Year: 2018
    }; 
        
    const d4 = {
        Day: 12,
        Hour: 4,
        InMapCode: "DE",
        Month: 8,
        OutMapCode: "CZ",
        Quantity: 298,
        Service: "Co",
        Type: "E",
        Year: 2018
    };          
    
    const d5 = {
        Day: 3,
        Hour: 4,
        InMapCode: "CZ",
        Month: 9,
        OutMapCode: "AT",
        Quantity: -96,
        Service: "Co",
        Type: "I",
        Year: 2018
    };    
    
    myCFData.push(d1,d2,d3,d4,d5);
    
    let arrayCountry = myCFData.map(function(d) {
       return d.OutMapCode;
    });    
    arrayCountry.splice(arrayCountry.indexOf(myCountry), 1 );
    
    return arrayCountry;
} 

///////////

function p_composite_chart(mapCode) {

    let dimension=[{
        Day: 15,
        Hour: 1,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 60.09,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 2,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 51.09,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 3,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 49,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 4,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 46.27,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 5,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 45.37,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 6,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 50.14,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 7,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 54.83,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 8,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 73.1,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 9,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 78.17,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 10,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 77.9,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 11,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 75.51,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 12,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 75,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 13,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 72,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 14,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 70.01,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 15,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 68.76,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 16,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 70.08,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 17,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 73.03,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 18,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 75.93,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 19,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 81.91,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 20,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 97,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 21,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 96.18,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 22,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 81,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 23,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 73.89,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018},{
        Day: 15,
        Hour: 24,
        InMapCode: "SK",
        Month: 9,
        OutMapCode: "SK",
        Price: 59.93,
        Quantity: NaN,
        Service: "Pr",
        Type: "E",
        Year: 2018}];

        function prices_by_day (dimension, mapCode) {
            let p = { count: 0, total: 0, average: 0};
        
            dimension.forEach(function(v){
                if(v.OutMapCode == mapCode && v.Service == "Pr") { 
                    p.count++;
                    p.total+= parseFloat(v.Price);
                    p.average = parseFloat(p.total / p.count);
                }            
            });    
        
            return p; 
        }
    
        return prices_by_day(dimension, mapCode);
}