# OTE Czech Republic and Slovakia Power Transmission 

OTE is the market coupling regions of Eastern European countries, composed of CZ (Czech Republic), SK (Slovakia), HU (Hungary) and RO (Romania). Power / Electricity sector has been privatised
since the year 2003 and lots of market players are into this market. Transmission is part of the four different parts (Load, Generation, Transmission, Balancing) to analyze the power market.

This project displays information about two months of the third-quarter of the year (August, September) concerning the CZ and SK region.

For newcomers on the market or current power traders to get a brief overview, this info is very useful. For both to capture the level of prices and quantities for this region or countries. For newcomers, to understand schematically how transmission works and the sequence. For current traders, to
use this piece of historical data information to bid for further yearly/monthly capacity auctions, spread and volatility.

## UX

- The strategy plane: Aim to achieve a website about Power Transmission.
  Target audience :
  - People surrounded by the power business
  - People that are willing to enter into the power business or local people to have a brief overview 

- The scope plane: 
  - Features :
    - An initial relative info section
    - Main Hub and Month Selector
    - Transmission Prices and Quantities Information on a Monthly and Daily basis

- The structure plane: 
  - Info is structured in a standard way. One page is displayed
  - A relative info slider for viewers to understand how to read the page
  - A dropdown list OTE hub selector ("CZ: Main", "SK: Main"), group by another dropdown list, the Month Selector (8,9)
  - Two distinct aspects (month and daily). Grouped displayed first (monthly), displayed second (daily)

- The skeleton plane: 
  - Page info represented from left to right (or top to bottom) concept :
    - Text written to the point (info section at the beginning and one small description per graph)
    - Two dropdown lists (hub and month selector)
    - Two buttons (a slider and one for displaying hub results)
    - Five number display for CZ and four number display for SK cross filtering
    - Five dc.js graphs (pie chart, stack chart, two composite line charts, one composite scatter plot chart)

- The surface plane: 
  - Colours : a dark navbar but a contrast white colours to the body section for one to view the graphs per horizontal and vertical axis more clearly.
  - Semantic : header, nav, section, bootstrap (theme, row, column grid and buttons)
  - Typography : google fonts and bootstrap libraries like centering or justifying text to demonstrate description. Font awesome icons to display plus for exports and minus for imports.
  - JQuery slide up and down the introductory information on screen. Country option selection value and css price visibility (visible or hidden)

##### User Stories list:

- As a developer :
  - I wanted to display the graphs for all the Transmission Section in one page, so that I can achieve the user to correlate the data between them more easily.
  - As I display data for two months, for users to enable reading the data :
    - I inserted on linecharts dashed lines for the Month of August (oldest month) and regular lines for Month of September (newest month).
    - Have text and background body color contrasting colours.

- As a user : 
  - Display first the Monthly section and then the Daily section, to achieve first whether the country is exporting or importing and which neighboring country has the greatest impact.
  - Display countries prices on screen at a glance as it is my primary concern to see the level and differences within each country.
  - Have legends on each graph indicating the country and month for me to highlight and see its related monthly portion or daily plots.

A mockup frame of the website, one could find it at the attached pdf file at the directory mockup_frame. 

## Features


### Existing Features

- Above mentioned on the structure and skeleton plane

---

Currently, the website provides with a general but on point overview of the subject. Additional plans to be implemented in the future would be :

- Restructure info and broaden your dimension to [Month, Day, Type, Service, Country] from current [Month, Day, Type, Service] to enable crossfilter flexibility on for ex. monthly stack bar chart.  

- Table data to Render on a different page with format [Country, Month, Day, Type, Quantity/Price].

- On a broad basis, create four tabs on Navigation bar (Favorites, Load, Generation, Transmission, Balancing) and insert related graphs on each other section. 

### Features Left to Implement

- Q3 months are July, August and September. We do not display information for July for one to compare all the quarter.

- OTE regions are composed of four regions. We only display data for two (CZ, SK) and we miss displaying the other two (HU, RO). 

- Physical Schedules graph to add at the bottom (or at the right on a Desktop approach) of the Commercial Schedules Graph on daily section.

## Technologies Used

- [HTML5]
    - The project uses **HTML5** to structure the webpages.

- [CSS3](https://github.com/feddieminas/project_om/blob/master/assets/css/style.css)
    - The project uses **CSS3** to style the webpages.

- [Bootstrap CSS](https://getbootstrap.com/docs/3.3/getting-started/)
    - The project uses **Bootstrap 3 CSS** to create navigation bar, forms, text and display classes.

- [Bootswatch](https://bootswatch.com/cosmo/)
    - The project uses **Bootswatch Cosmo Theme** to render the page and style it accordingly.
    
- [Font Awesome](https://fontawesome.com/v4.7.0/)
    - The project uses **Font Awesome** to insert icons for a user friendly visualisation and navigation. 

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to enable interactivity of slider and dropdown buttons.

- [D3 JS](https://cdnjs.com/libraries/d3)
    - The project uses **D3 JS** for data type, formats, selecting elements and functions. 

- [Crossfilter JS](https://cdnjs.com/libraries/crossfilter) 
    - The project uses **Crossfilter** to make DC graphs to respond accordingly.

- [DC JS](https://cdnjs.com/libraries/dc)
    - The project uses **DC** to create responsive graphs.

- [Queue JS](https://cdnjs.com/libraries/queue-async)
    - The project uses **Queue** to load data csv text and parse all info. 

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
    - The project uses **Chrome DevTools** to simplify editing pages on-the-fly and assist you to responsive design. 


## Testing

- Used Jasmine framework to test :
  - My DateTime column parsed from csv is read as string and methods concerning string types are functioning to produce my object Date type.
  - The array country outer function to display the main hub's neighbouring countries has all the objectContaining.
  - A custom reduce inner function (third graph daily price composite chart) calculation of a country's daily average number conforms to its data title on the chart.     

----

Encountered issues:

- The csv files have a DateTime column which convert it by itself (Date type the whole string) would indeed work in Google Chrome but would encountered issues in Safari. 

- D3 domain and scales to set on dc.js graphs.

- Insert custom data titles on composite dc.js graphs. 

## Deployment

I deployed the project on Cloud 9 Platform.

Worked on Google Chrome Version 71 and Safari Version 10.1.2. 

## Credits


### Content

- The data folder information for this website were obtained from the ftp server of the [ENTSOE Transparency Platform](https://entsoe.zendesk.com/hc/en-us/articles/115000173266-Overview-of-data-download-options-on-Transparency-Platform).

### Media

- Same as above in content section. 

### Acknowledgements

- I received inspiration for this project from myself working at the Power Industry for several years and visually from the [French National Grid RTE](http://clients.rte-france.com/lang/an/visiteurs/vie/tableau_de_bord.jsp?dashMode)
