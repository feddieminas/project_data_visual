
$(document).ready(function() {
    
    $("#btnInstr").click(function(){
        if ($("#Slider").hasClass("slideup")) {
            $("#Slider").removeClass("slideup").addClass("slidedown");            
        }
        else {
            $("#Slider").removeClass("slidedown").addClass("slideup");             
        }
    });
    
    $("#countchg").click(function(){
        const selectedText = $("#selCountry").find("option:selected").text(); 
        const selectedValue = $("#selCountry").val(); 
        
        if (selectedValue == "SK : Main") {
            $("#country-name-4").css({'visibility': 'hidden'});
            $("#price-avg-per-month-4").css({'visibility': 'hidden'});
        } else {
            $("#country-name-4").css({'visibility': 'visible'});
            $("#price-avg-per-month-4").css({'visibility': 'visible'});
        }
                
        data_preprocess();        
    }); 
    
});

queue()
    .defer(d3.tsv, "data/2018_8_9_DayAheadPrices_CZSK.csv", function(d) {
        d.Year = parseInt(d.Year);
        d.Month = parseInt(d.Month);
        d.Day = parseInt(d.Day);
        return {
            Year: d.Year,
            Month: d.Month,
            Day: d.Day,
            DateTime: d.DateTime,
            OutMapCode: d.MapCode,
            InMapCode: d.MapCode,
            Price: d.Currency == "PLN" ? parseFloat(parseFloat(d.Price * 0.233).toFixed(2)) : parseFloat(parseFloat(d.Price).toFixed(2)),
            Service: "Pr" // Price
        }; 
    }) 
    .defer(d3.tsv, "data/2018_8_9_ScheduledCommercialExchanges_CZSK.csv", function(d) {
        d.Year = parseInt(d.Year);
        d.Month = parseInt(d.Month);
        d.Day = parseInt(d.Day);        
        return {
            Year: d.Year,
            Month: d.Month,
            Day: d.Day,
            DateTime: d.DateTime,
            OutMapCode: d.OutMapCode,
            InMapCode: d.InMapCode,
            Quantity: parseFloat(parseFloat(d.Capacity).toFixed(2)),
            Service: "Co" // Commercial Schedules
        };
    })  
    .defer(d3.tsv, "data/2018_8_9_ForecastedDayAheadTransferCapacities_CZSK.csv", function(d) {
        d.Year = parseInt(d.Year);
        d.Month = parseInt(d.Month);
        d.Day = parseInt(d.Day); 
        return {
            Year: d.Year,
            Month: d.Month,
            Day: d.Day,
            DateTime: d.DateTime,
            OutMapCode: d.OutMapCode, 
            InMapCode: d.InMapCode, 
            Quantity: parseFloat(parseFloat(d.ForecastTransferCapacity).toFixed(2)),
            Service: "Tr" // Transfer
        };
    })    
    .await(merging);  
    
    function getDaysInMonth(year,month) {
        return new Date(year, month, 0).getDate();
    }        

    function someFileAdjs(arrayData) {
        const timer=24; 
        arrayData.forEach(function(d){
            const dd = d.DateTime; 
            
            const helpY = parseInt(dd.substr(0,4));const helpM = parseInt(dd.substr(5,2));           
            const helpD = parseInt(dd.substr(8,2));const helpH = parseInt(dd.substr(11,2)); 
            
            const ddate = new Date(helpY,helpM-1,helpD,helpH,0,0); 
            
            ddate.setHours(+ddate.getHours()+(timer/8));
            
            d.Year = parseInt(ddate.getFullYear());
            d.Month = parseInt(ddate.getMonth()+1);
            
            const myhourf = ddate.getHours();
                    
            switch (myhourf) {
                case 0:
                    if (ddate.getDate() == 1) {
                        d.Day = parseInt(getDaysInMonth(2018,d.Month-1));
                        d.Month = parseInt(d.Month - 1);
                    }
                    else {
                        d.Day = parseInt(ddate.getDate()-1);
                    }
                    d.Hour = 24;
                    break; 
                default: 
                    d.Day = parseInt(ddate.getDate());            
                    d.Hour = parseInt(ddate.getHours());
                }            
                    
            d.OutMapCode = typeof(d["OutMapCode"]) == "undefined" ? d["OutMapCode"] : d["OutMapCode"].substring(0,2);
            d.InMapCode = typeof(d["InMapCode"]) == "undefined" ? d["InMapCode"] : d["InMapCode"].substring(0,2);
            
            d.Quantity=parseFloat(d.Quantity);
                
            delete d.DateTime;
        });
        return arrayData;
    }        
    
    let dataMD; 
    
    class MyData {
      constructor(data) {
        this.data = data;
      }
    
      ret() {
        return this.data;
      }
    }    
    
    function merging(error, priceData, schedCData, tranferData) { 
            priceData = someFileAdjs(priceData); schedCData = someFileAdjs(schedCData); 
            tranferData = someFileAdjs(tranferData);
            
            let myMergeData = d3.merge([priceData, schedCData, tranferData]); 
    
            dataMD = new MyData(myMergeData);
    
            data_preprocess();
    }
    
    function retDropdownVal(id) {
        const e = document.getElementById(id); 
        const strOpt = e.options[e.selectedIndex].value; 
        const myoption = strOpt.length > 2 ? strOpt.substr(0,2): strOpt; 
        return myoption;
    }
    
            
    function data_preprocess() {
        let myCFData = []; 
        let myNeighbors; 
            
        function change_data() {
            const myCountry= retDropdownVal("selCountry"); 
                
            let myMergeData = dataMD.ret(); 
                
            myNeighbors = (d3.map(myMergeData, function(d){
                if(((d.OutMapCode == myCountry || d.InMapCode == myCountry) && !(d.OutMapCode == myCountry && d.InMapCode == myCountry))) {
                    return d.InMapCode;    
                }
            }).keys());
                
            const index = myNeighbors.indexOf("undefined"); 
                if (index > -1) {
                    myNeighbors.splice(index, 1);
            }
                    
            function checkAvailability(arr, val) {
                return arr.some(function(arrVal) {
                        return val === arrVal;
                    });
                }
                    
                myCFData = myMergeData.filter(function(d) {
                    return (d.Year == 2018 && (((d.OutMapCode == myCountry || d.InMapCode == myCountry) && !(d.OutMapCode == myCountry && d.InMapCode == myCountry)) || 
                    (d.Service =="Pr" && checkAvailability(myNeighbors, d.OutMapCode) )) );
                });
                
                myCFData = myCFData.map(function(d) {
                    if (d.Service != "Pr") {
                        if (d.OutMapCode == myCountry) {
                            d.Type = "E"; 
                        } else {
                            d.Type = "I"; 
                            d.Quantity = d.Quantity == 0 ? parseFloat(d.Quantity) : parseFloat(-d.Quantity);
                        }    
                    } else {
                        d.Type = "E"; // for cross filtering purposes, Prices on Export Quantities to be visible
                    }
                    return d;
                });
                    
                return;
        }
        change_data();
            
        makeGraphs(myCFData);
    }
    
    function show_month_selector(ndx) {
        const dim = ndx.dimension(dc.pluck('Month')); 
        const group = dim.group(); 
            
        let select = dc.selectMenu('#month-selector') 
            .dimension(dim)
            .group(group)
            .render();
                
        select.title(function (d){
            return d.key;
        });
    }  
    
    function arrCountr(myCFData, myCountry) {
        let arrayCountry = []; 
        arrayCountry = d3.map(myCFData, function(d){return d.OutMapCode;}).keys();
        arrayCountry.splice(arrayCountry.indexOf(myCountry), 1 );
        return arrayCountry;
    }    
    
    function makeGraphs(myCFData) {
            let ndx = crossfilter(myCFData); 
            
            show_month_selector(ndx);
        
            ////////
            
            const myCountry = retDropdownVal("selCountry"); 
            document.getElementById('country-name').innerHTML = myCountry;
            show_p_number(ndx,myCountry,"#price-avg-per-month");

            let arrayCountry = []; 
            arrayCountry = arrCountr(myCFData, myCountry);
         
            for (var i=0; i<arrayCountry.length ;i++) {
                    document.getElementById("country-name-" + (i+1)).innerHTML = arrayCountry[i];
                    show_p_number(ndx,arrayCountry[i],"#price-avg-per-month-" + (i+1));                      
            }
            
            ////////
            
            show_monthly_pie(ndx,myCFData);

            show_monthly_stack(ndx,myCFData);
            
            ////////            
            
            show_day_P_composite_chart(ndx,myCFData);
            
            show_day_NTC_scatter_chart(ndx,myCFData);
            
            show_CB_composite_chart(ndx,myCFData);
            
            ////////       
            
            setTimeout(function(){ dc.renderAll();dc.redrawAll(); }, 300);
    }    
    
    ///// Transmission Monthly /////
    
    function monthly_fix_bins(source_group,identifier = "N") {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                switch (identifier) {
                    case "Y": // Stack Chart
                        return d.key[1] != undefined;
                    case "N": // Pie Chart
                        return d.key[1] != undefined;
                }
                });
            }
        };
    }
    
    function show_monthly_pie(ndx, myCFData) { 
        
        const myCountry = retDropdownVal("selCountry"); 
        
        let month_dim = ndx.dimension(function(d) {return [d.Month,d.Type]; }); 
        
        function sumByImpExp (dimension, mapCode) {
            return dimension.group().reduce(
                function (p, v) {
                    if(v.Service == "Co") {
                        if (v.OutMapCode == myCountry) {
                            p.value += +Math.abs(v.Quantity); 
                        } else if (v.InMapCode == myCountry) {
                            p.value += -Math.abs(v.Quantity); 
                        }   
                    }
                        return p;
                    },
                    function (p, v) {
                    if(v.Service == "Co") {
                        if (v.OutMapCode == myCountry) {
                            p.value -= +Math.abs(v.Quantity); 
                        } else if (v.InMapCode == myCountry) {
                            p.value -= -Math.abs(v.Quantity); 
                        }                                 
                    }
                        return p;
                    },
                    function () { 
                        return {value: 0};
                    }        
                );
            }           
            
        let total_impexp_per_country = sumByImpExp(month_dim,myCountry); 
        total_impexp_per_country = monthly_fix_bins(total_impexp_per_country);       
            
        const f = d3.format(".2f");    
        
        const dictEI ={"E": "Exp","I": "Imp"};    
            
        dc.pieChart('#impexp-total-per-month') 
            .width(300)
            .height(250)            
            .radius(90)
            .transitionDuration(500)
            .dimension(month_dim)
            .valueAccessor(function(d) {
                return f(Math.abs(d.value.value));   
            })
            
            .label(function(d) { 
                return d.key[0] + ", " + dictEI[d.key[1]];
            })
            .renderLabel(true)
            .title(function(d) { return dictEI[d.key[1]] + "orts: " + (f(f(d.value.value)/1000)) + " GWh"; })
            .renderTitle(true) 
            .group(total_impexp_per_country);
    }    
        
    function show_monthly_stack(ndx, myCFData) { 
        
        const myCountry = retDropdownVal("selCountry"); 
            
        function rankByImpExp (dimension, mapCode) {
            return dimension.group().reduce(
                function (p, v) {
                    if(v.Service == "Co") {
                        if (v.OutMapCode == myCountry) {
                            p.total += Math.abs(v.Quantity); 
                        } else if (v.InMapCode == myCountry) {
                            p.total += Math.abs(v.Quantity); 
                        }
                            
                        if(v.OutMapCode == myCountry && v.InMapCode == mapCode) { 
                            p.match += Math.abs(v.Quantity);
                        } else if (v.OutMapCode == mapCode && v.InMapCode == myCountry) {
                            p.match += Math.abs(v.Quantity);
                        }                        
                    }
                        
                        return p;
                    },
                    function (p, v) {
                    if(v.Service == "Co") {
                        if (v.OutMapCode == myCountry) {
                            p.total -= Math.abs(v.Quantity); 
                        } else if (v.InMapCode == myCountry) {
                            p.total -= Math.abs(v.Quantity); 
                        }                            
                            
                        if(v.OutMapCode == myCountry && v.InMapCode == mapCode) {  
                            p.match -= Math.abs(v.Quantity);
                        } else if (v.OutMapCode == mapCode && v.InMapCode == myCountry) {
                            p.match -= Math.abs(v.Quantity);
                        }                        
                    }
                        return p;
                    },
                    function () { 
                        return {total: 0, match: 0};
                    }        
                );
            }             
        
            let month_dim = ndx.dimension(function(d) {return [d.Month,d.Type]; }); 
            
            let arrayCountry = []; 
            arrayCountry = arrCountr(myCFData, myCountry);
            
            let mygroup = rankByImpExp(month_dim, arrayCountry[0]); 
            mygroup = monthly_fix_bins(mygroup,"Y");
            
            var f = d3.format(".2f");
            
            const dictEI ={"E": "Exports","I": "Imports"};    
            
            let StackChart = dc.barChart("#impexp-total-per-month-country") 
                .width(350)
                .height(250) 
                .dimension(month_dim)
                .group(mygroup, arrayCountry[0])
                .valueAccessor(function(d) {
                    if(d.value.total > 0 && d.value.match > 0) {
                        return (f(d.value.match) / f(d.value.total)) * 100; 
                    } else if (d.value.total > 0 && d.value.match > 0) {
                        return (f(d.value.match) / f(d.value.total)) * 100;
                    } else {
                        return 0;
                    }
                })
                
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                
                .title(function(d,i) { 
                    return arrayCountry[i] + " " + dictEI[d.key[1]] + ": " + ((f(d.value.match) / f(d.value.total)) * 100).toFixed(2) + " %"; 
                })
                .renderTitle(true)    
                
                .on('renderlet', function(chart) { 
                    chart.select('svg').attr("transform", "translate(" + 0 + "," + 0 + ")");
                })                    
                
                .transitionDuration(500)
                
                .legend(dc.legend().x(260).y(20).itemHeight(15).gap(5))
                .margins({top: 5, right: 100, bottom: 20, left: 25}); 
               
                for (var i = 1; i < arrayCountry.length; i++) {
                    mygroup = rankByImpExp(month_dim, arrayCountry[i]);
                    mygroup = monthly_fix_bins(mygroup,"Y");
                    StackChart.stack(mygroup, arrayCountry[i])    
                }
                
                StackChart.xAxis().tickFormat(function(d) { 
                    return d[0] + "," + dictEI[d[1]].slice(0,3); 
                });
    }
    
    function show_p_number(ndx,myCountry,selectedId) {
            
        let month_dim = ndx.dimension(function(d) {return [d.Month,d.Type,d.Service]; }); 
        
        let average_price_by_hub = month_dim.groupAll().reduce(   
                function (p,v) {
                    if(v.OutMapCode == myCountry && v.Service == "Pr") { 
                            p.count++;
                            p.total+= v.Price;
                            p.average = parseFloat(p.total / p.count);
                    }    
                        return p;                   
                },
                function (p, v) {
                    if(v.OutMapCode == myCountry && v.Service == "Pr") {
                        p.count--;
                        if (p.count == 0) {
                            p.total = 0;
                            p.average = 0;
                        } else {
                            p.total-= v.Price;
                            p.average = parseFloat(p.total / p.count);
                        }
                    }    
                        return p;   
                },
                function () {
                    return { count: 0, total: 0, average: 0};
                }
            );
            
        dc.numberDisplay(selectedId)
            .formatNumber(d3.format(".2f")) 
            .valueAccessor(function(d) {
                    return d.average;
            })
            .group(average_price_by_hub);            
                
    }
    
    ///// Transmission Daily /////
    
    function arrMonthRet() {
        let select = d3.select('#month-selector'); 
        let s = select.select(".dc-select-menu")[0]; 
        
        let arrMonths = []; 
        for (var i=0;i<s[0].childNodes.length;i++) {
            if(s[0].childNodes[i].value !== "") {
                let val = parseInt(s[0].childNodes[i].value); 
                arrMonths.push(val);  
            }
        }
        return arrMonths;
    }
    
    function countColor() {
        return {
            CZ: 'navy',
            AT: 'black',
            DE: '#FF7F0E',
            PL: 'red',
            HU: 'green',
            SK: 'blue'
        };        
    }
    
    function daily_fix_bins(source_group,myoption,identifier,helper = "") {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                switch (identifier) {
                    case "N": // Prices
                    if(myoption == "") {
                        return d.key[3] == "Pr";   
                    } else {
                        return d.key[0] === myoption && d.key[3] == "Pr";
                    }
                    case "Y": // NTC
                        return d;
                    case "S":
                    if(myoption == "") { // Schedules
                        return d;   
                    } else {
                        return d.key[0] === myoption && d.key[2] == helper;
                    }
                }
                });
            }
        };
    }    
    
    
    function sort_order(arr) {
        arr.sort(function(a, b) {
            if(a[0] === b[0]) {
                return a[1] - b[1];
            } else {
                return a[0] - b[0];
            } 
        });
        return arr;
    }
    
    function sort_group(group, order) { 
    return {
        all: function() {
            var g = group.all(), map = {};

            g.forEach(function(kv) {
                map[[kv.key[0],kv.key[1],kv.key[2]]] = kv.value.average;
            });
            return order.map(function(k) {
                return {key: [k[0],k[1],k[2]], value: map[[k[0],k[1],k[2]]]};
                });
            }
        };
    }
    
    function show_day_P_composite_chart(ndx,myCFData) {
            
        const myCountry = retDropdownVal("selCountry"); 
        
        let day_dim = ndx.dimension(function(d) {return [d.Month,d.Day,d.Type,d.Service]; }); 
            
        function prices_by_day (dimension, mapCode) {
            return dimension.group().reduce(
                function (p, v) {
                    if(v.OutMapCode == mapCode && v.Service == "Pr") { 
                            p.count++;
                            p.total+= parseFloat(v.Price);
                            p.average = parseFloat(p.total / p.count);
                    }
                        return p; 
                    },
                    function (p, v) {
                        if(v.OutMapCode == mapCode && v.Service == "Pr") {
                            p.count--;
                            if (p.count == 0) {
                                p.total = 0;
                                p.average = 0;
                            } else {
                                p.total-= parseFloat(v.Price);
                                p.average = parseFloat(p.total / p.count);
                            }
                        }    
                        return p;    
                    },
                    function () { 
                        return { count: 0, total: 0, average: 0};
                    }        
        )} 

        let arrMonths = []; 
        arrMonths = arrMonthRet();
        
        let colorCountryDict = {}; 
        colorCountryDict = countColor();
        
        let arrayCountry = []; 
        arrayCountry = arrCountr(myCFData, myCountry);
            
        let compositeChart = dc.compositeChart('#prices-composite-chart'); 
        
        let countDict = {}; let composeLines = []; 
 
        const f = d3.format(".2f"); 
        let minPrice = 1000; let maxPrice = 0; 
        const mapDash = {8: 5, 9: 0}; 
 
        for (var i=0; i < arrayCountry.length; i++) {
            for (var j=0;j<arrMonths.length;j++) {
                let countryPerDay = daily_fix_bins(prices_by_day(day_dim,arrayCountry[i]),arrMonths[j],"N"); 
                
                let order = countryPerDay.all().map(function(d) { 
                    return [d.key[0],d.key[1],d.key[2]]; 
                });
                
                order = sort_order(order);
                
                let sorted_group = sort_group(countryPerDay, order); 
                
                let minVal = Math.min.apply(Math, sorted_group.all().map(function(o) { return o.value; })); 
                minVal = parseFloat(parseFloat(minVal,10).toFixed(0));
                let maxVal = Math.max.apply(Math, sorted_group.all().map(function(o) { return o.value; })); 
                maxVal = parseFloat(parseFloat(maxVal,10).toFixed(0));
                
                if(maxVal > maxPrice) {maxPrice=maxVal;}
                if(minVal < minPrice) {minPrice=minVal;}                
                
                countDict[arrayCountry[i]] = sorted_group; 
                
                composeLines.push(dc.lineChart(compositeChart)  
                                    .colors(colorCountryDict[arrayCountry[i]])
                                    .group(countDict[arrayCountry[i]] , arrayCountry[i])
                                    .keyAccessor(function (d) {
                                        return d.key[1];
                                    })
                                    .valueAccessor(function (d) {
                                        return  f(d.value); 
                                    })
                                    .dashStyle([mapDash[arrMonths[j]]])
                                );  
            }
        }
                                             
        compositeChart
            .width(600)
            .height(250) 
            .dimension(day_dim)
            .x(d3.scale.linear().domain([0,31]))
            .y(d3.scale.linear().domain([minPrice-5,maxPrice+9])) 
            .yAxisLabel("Price €")
            .xAxisLabel("Day")
            .legend(dc.legend().x(50).y(170).itemHeight(13).gap(3).horizontal(true).legendWidth(290))  
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            
            .compose(composeLines)
            
            .on('renderlet', function(chart) { 
                chart.select('.x-axis-label').attr("transform", "translate(" + 296 + "," + 240 + ")");
                
                let c = chart.selectAll(".dc-legend").selectAll(".dc-legend-item").selectAll("text"); 
                let mylength = c.length;
                
                if(mylength == (arrayCountry.length*2)) {
                    for (var i=0; i < mylength; i++) {
                            c[i][0].innerHTML = c[i][0].innerHTML.slice(0,2) + " " + arrMonths[i % 2];
                    }
                }
                
            })            
            
            .ordering(function(d) { return -d.value,d.key[0],d.key[1]; })
            .brushOn(false); 
                
            compositeChart.xAxis().ticks(25); 
            compositeChart.yAxis().ticks(15); 
    }
    
    function qties_by_day (dimension, mycountry, mapCode, serviceCode) {
        return dimension.group().reduce(
            function (p, v) {
                if(v.Service == serviceCode) {
                    if(v.OutMapCode == mycountry && v.InMapCode == mapCode) { 
                            p.countE++;
                            p.totalE+= Math.abs(parseFloat(v.Quantity));
                            p.average = Math.abs(parseFloat(p.totalE / p.countE));
                    } else if (v.OutMapCode == mapCode && v.InMapCode == mycountry) {
                            p.countI++;
                            p.totalI+= -Math.abs(parseFloat(v.Quantity));
                            p.average = -Math.abs(parseFloat(p.totalI / p.countI));                        
                    }                    
                }

                    return p; 
                },
                function (p, v) {
                if(v.Service == serviceCode) {
                    if(v.OutMapCode == mycountry && v.InMapCode == mapCode) {
                        p.countE--;
                        if (p.countE == 0) {
                            p.totalE = 0;
                            p.average = 0;
                        } else {
                            p.totalE-= Math.abs(parseFloat(v.Quantity));
                            p.average = Math.abs(parseFloat(p.totalE / p.countE));
                        }
                    }    
                    else if (v.OutMapCode == mapCode && v.InMapCode == mycountry) {
                        p.countI--;
                        if (p.countI == 0) {
                            p.totalI = 0;
                            p.average = 0;
                        } else {
                            p.totalI-= -Math.abs(parseFloat(v.Quantity));
                            p.average = -Math.abs(parseFloat(p.totalI / p.countI));
                        }                            
                    }                    
                }
                    return p;    
                },
                function () { 
                    return { countE: 0, countI: 0, totalE: 0, totalI:0, average: 0};
                }        
    )}    
    
    function show_day_NTC_scatter_chart(ndx,myCFData) {
        const myCountry = retDropdownVal("selCountry"); 
        
        let day_dim = ndx.dimension(function(d) {return [d.Month,d.Day,d.Type]; }); 
        
        let colorCountryDict = {}; 
        colorCountryDict = countColor();
        
        let countryColors = d3.scale.ordinal() 
            .domain(Object.keys(colorCountryDict))
            .range(Object.values(colorCountryDict));            
        
        let arrayCountry = []; 
        arrayCountry = arrCountr(myCFData, myCountry);
        
        let compositeChart = dc.compositeChart('#ntc-scatter-chart'); 
        
        let countDict = {}; let composeLines = []; 
        const f = d3.format(".2f"); 
            
        for (var i=0; i < arrayCountry.length; i++) {
            let countryPerDay = qties_by_day(day_dim,myCountry,arrayCountry[i],"Tr");
            countryPerDay = daily_fix_bins(countryPerDay,'',"Y");
            
            let order = countryPerDay.all().map(function(d) { 
                return [d.key[0],d.key[1],d.key[2]]; 
            });
            
            order = sort_order(order);
            
            let sorted_group = sort_group(countryPerDay, order); 
            
            countDict[arrayCountry[i]] = sorted_group;
             
            composeLines.push(dc.scatterPlot(compositeChart)  
                                .colors(colorCountryDict[arrayCountry[i]])
                                .group(countDict[arrayCountry[i]], arrayCountry[i])
                                .keyAccessor(function (d) {
                                    return d.key[1];
                                })
                                .valueAccessor(function (d) {
                                    return  f(d.value); 
                                })
                                .symbolSize(5)
                            );
            }
        
        compositeChart
            .width(600)
            .height(300)
            .dimension(day_dim)
            .x(d3.scale.linear().domain([0,31])) 
            
            .y(d3.scale.linear().domain([-2000,2000]))    
                
            .clipPadding(10)                
                
            .yAxisLabel("Qties MW")
            .xAxisLabel("Day")
            
            .legend(dc.legend().x(530).y(20).itemHeight(13).gap(5))
            .margins({top: 10, right: 85, bottom: 43, left: 55})  
            
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)            
            
            .compose(composeLines)

            .ordering(function(d) { return -d.value,d.key[0],d.key[1]; })
            .brushOn(false); 
                
            compositeChart.xAxis().ticks(25); 
            compositeChart.yAxis().ticks(14);     
    }
    
    function show_CB_composite_chart(ndx,myCFData) {
        
        const myCountry = retDropdownVal("selCountry"); 
        
        let day_dim = ndx.dimension(function(d) {return [d.Month,d.Day,d.Type]; }); 
        
        let arrMonths = []; 
        arrMonths = arrMonthRet();
        
        arrMonths.push(["E","I"]);
        
        let colorCountryDict = {}; 
        colorCountryDict = countColor();
        
        let arrayCountry = []; 
        arrayCountry = arrCountr(myCFData, myCountry);
            
        let compositeChart = dc.compositeChart('#cb-composite-chart'); 
        
        let countDict = {}; let composeLines = []; 
 
        const f = d3.format(".2f"); 
 
        const mapDash = {8: 5, 9: 0}; 
 
        for (var i=0; i < arrayCountry.length; i++) {
            for (var j=0; j < arrMonths.length; j++) {
                for (var k=0; k < 2; k++) {
                    let countryPerDay = daily_fix_bins(qties_by_day(day_dim,myCountry,arrayCountry[i],"Co"),arrMonths[j],"S",arrMonths[2][k]); 
                    
                    if(countryPerDay.all().length == 0) {continue;}
                    
                    let order = countryPerDay.all().map(function(d) { 
                        return [d.key[0],d.key[1],d.key[2]]; 
                    });
                    
                    order = sort_order(order);
                    
                    let sorted_group = sort_group(countryPerDay, order); 
                    
                    countDict[arrayCountry[i]] = sorted_group;  
                    
                    composeLines.push(dc.lineChart(compositeChart)  
                                        .colors(colorCountryDict[arrayCountry[i]])
                                        .group(countDict[arrayCountry[i]] , arrayCountry[i])
                                        .keyAccessor(function (d) {
                                            return d.key[1];
                                        })
                                        .valueAccessor(function (d) {
                                            return  f(d.value);
                                        })
                                        .dashStyle([mapDash[arrMonths[j]]])
                                    );      
                }
            }
        }
                                             
        compositeChart
            .width(600)
            .height(300) 
            .dimension(day_dim)
            .x(d3.scale.linear().domain([0,31])) 
            
            .y(d3.scale.linear().domain([-2000,2000]))    
                
            .yAxisLabel("Qties MWh")
            .xAxisLabel("Day")
            
            .legend(dc.legend().x(60).y(228).itemHeight(13).gap(1).horizontal(true).legendWidth(560))  
            
            .on('renderlet', function(chart) { 
                let c = chart.selectAll(".dc-legend").selectAll(".dc-legend-item"); 
                let mylength = c[0].length; 
                
                let myarrlength = arrayCountry.length; 
                
                if(myarrlength == 3 && (mylength == (myarrlength*4))) {chart.select('.dc-legend').attr("transform", "translate(" + 60 + "," + 160 + ")");} 
                
                if(mylength == (myarrlength*4)) {
                    for (var i=1; i<mylength;i+=2) {c[0][i].remove();}
                    c = chart.selectAll(".dc-legend").selectAll(".dc-legend-item").selectAll("text");
                    mylength = c.length;                    
                    for (var i=0; i < mylength; i++) {
                            c[i][0].innerHTML = c[i][0].innerHTML.slice(0,2) + " " + arrMonths[i % 2];
                    }
                }
                
            })   
            
            .margins({top: 10, right: 85, bottom: 43, left: 55}) 
            
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            
            .compose(composeLines)

            .ordering(function(d) { return -d.value,d.key[0],d.key[1]; })
            .brushOn(false);
                
            compositeChart.xAxis().ticks(25);
            compositeChart.yAxis().ticks(15);
            
    }