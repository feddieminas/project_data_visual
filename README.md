# OTE Czech Republic and Slovakia Power Transmission 

OTE is the market coupling regions of Eastern European countries, composed of CZ (Czech Republic), SK (Slovakia), HU (Hungary) and RO (Romania). Power / Electricity sector has been privatised
since the year 2003 and lots of market players are into this market. Transmission is part of the four different parts (Load, Generation, Transmission, Balancing) to analyze the power market. Transmission
is cross-border from/to one country to the other. The market is cleared as day-ahead, the day before the actual delivery day of the power takes place. This occurs through capacity auctions that take place,
traders receive the capacity based on their biddings and will then decide whether they would effectively like to schedule/move the capacity (MW), which is then the power (MWh).

This project displays information about two months of the third-quarter of the year (August, September) concerning the CZ and SK region.

For newcomers on the market or current power traders to get a brief overview, this info is very useful. For both to capture the level of prices and quantities for this region or countries. For newcomers, to understand schematically how transmission works and the sequence. For current traders, to
use this piece of historical data information to bid for further yearly/monthly capacity auctions, spread and volatility.

To conclude, generally, a data visualisation of this type is more efficient to occur per day, on an hourly basis with the latest forecasts.

## UX

- The strategy plane: Aim to achieve a website about Power Transmission, that shows the relative flows between the mentioned hubs. In addition, Czech Republic with its connection with Germany, it is considered
  as having an impact to many European primary and secondary markets.
  Target audience :
  - People surrounded by the power business
  - People that are willing to enter into the power business or local people to have a brief overview 

- The scope plane: 
  - Features :
    - An initial relative info section
    - Main Hub and Month Selector
    - Transmission Prices and Quantities Information on a Monthly basis
    - Transmission Prices and Quantities Information on a Daily basis

- The structure plane: 
  - Info is structured in a standard way. One page is displayed
  - A relative info slider for viewers to understand how to read the page
  - A dropdown list OTE hub selector ("CZ: Main", "SK: Main"), group by another dropdown list, the Month Selector (8,9)
  - Two distinct aspects (month and daily). Grouped displayed first (monthly), displayed second (daily)

- The skeleton plane: 
  - Page info represented from left to right (or top to bottom) concept :
    - Popular google font (Roboto) 
    - Text written to the point (info section at the beginning and one small description per graph)
    - Two dropdown lists (hub and month selector)
    - Two buttons (a slider concerning info and one for displaying hub results)
    - Five number display for CZ and four number display for SK cross filtering
    - Five dc.js graphs (pie chart, stack chart, two composite line charts, one composite scatter plot chart)

- The surface plane: 
  - Colours : a dark navbar but a contrast white colours to the body section for one to view the graphs per horizontal and vertical axis more clearly. Data label text colours
    to a darker colour to be more visual for a user especially when dealing with small devices.
  - Semantic : header, nav, section, bootstrap (theme, row, column grid and buttons)
  - Typography : google fonts and bootstrap libraries like centering or justifying text to demonstrate description. Font awesome icons to display plus for exports and minus for imports.
  - JQuery slide up and down the introductory information on screen. Country option selection value and css price visibility (visible or hidden)
  - Transition method : Graphs and slider button

##### User Stories list:

- As a developer :
  - I wanted to display the graphs for all the Transmission Section in one page, so that I can achieve the user to correlate the data between them more easily.
  - As I display data for two months, I inserted on linecharts dashed lines for the Month of August (oldest month) and regular lines for Month of September (newest month).
  - Have text and background body color contrasting colours for users to enable reading the data.
  - Have in all graphs data titles and fewest data labels for less numbers to be visually on page.
  - I wanted to avoid creating at the daily section three composite line charts and thus the middle one is a scatterplot that breaks the ice with linear data but several properties.

- As a user : 
  - Apply colour coding concept, each country to have its distinct colour associated with it.
  - Display first the Monthly section and then the Daily section, to achieve whether the country is exporting or importing and which neighboring country has the greatest impact.
  - Display countries prices on screen at a glance as it is my primary concern to see the level and differences within each country.
  - Have legends on each graph indicating the country and month for me to highlight and see its related monthly portion or daily plots.
  - Contrasting background and text colours to enable me read more easily.
  

A mockup frame of the website, one could find it at the attached pdf file at the directory mockup_frame. 

## Features



### Existing Features

- Main Navigation bar with Navigation brand at the top of the page 

- On Home (i.e. Power Market OTE Transmission) section :
  - A slideUp and slideDown single button to display info of the page
  - A dropdown list to select the OTE Hub you want to focus on
  - A display button information to load the related data for that hub
  - A dropdown cross filter dc.js selector to filter per month (August or September 2018)
  - Monthly Section
    - Display Price number of Main Hub
    - One pie chart and one stack chart that guides you the portion and impact of your Main Hub and within its neigboring countries
  - Daily Section
    - Display Price numbers of Main Hub neigboring countries
    - Two composite line charts and one composite scatter plot chart that guides you per day the level and quantities flows of your Main Hub and within its neigboring countries

---

Currently, the website provides with a general but on point overview of the subject. Additional plans to be implemented in the future would be :

- Display Hourly (per day and hour) graphs and table data as it is important since the Power Market is a continous market.

- On a broad basis, create four tabs on Navigation bar (Favorites, Load, Generation, Transmission, Balancing) and insert related graphs on each other section. Favorites would be one
  that a person chooses the graphs that is more interested to focus on. For ex. Load section to insert the Country's Main Hub Consumption minus the Renewables quantities delta with
  neighboring countries is considered vital for one to understand the narrow/wide spreads.

### Features Left to Implement

- OTE regions are composed of four regions. We only display data for two (CZ, SK) and we miss displaying the other two (HU, RO). 

- Physical Schedules graph to add at the bottom of the Commercial Schedules Graph on daily section. This will enable one to compare the differences between what is been scheduled and
what eventually happen on cross border at real time.

- Table data to Render on a different page with format [Country, Month, Day, Type, Quantity/Price].

- Q3 months are July, August and September. We do not display information for July for one to compare all the quarter.

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

- Used Chrome Dev tools :
  - libraries that are hooked
  - array information printed to visually see my data if applied correctly
    - Cross check all data transform per day and hour correctly with [ote-cr.cz](https://www.ote-cr.cz/en/short-term-markets/electricity/market-coupling)
  - graphs render correctly and renderlet trigger events are applied accordingly
  - responsive design 

- Check that when switching from one country to the other (i.e. OTE Hub Selector from CZ: Main to SK: Main and press display button), information for its related country is displayed accordingly.

----

Encountered issues:

- The csv files have a DateTime column which convert it by itself would indeed work in Google Chrome but would encountered issues in Safari. Therefore convert and get the correct data to transform
  to a CET time and retrieve the correct day and hour was challenging. 

- D3 domain and scales to set on dc.js graphs.

## Deployment

I deployed the project on Cloud9 platform. I used Git & GitHub for version control. I maintained the master as the only git branch. 
At the branch, structurally, I had the folder called static where I stored my CSS folder (relevant CSS libs and stylesheet (style.css)) and JS folder (relevant JS libs and own render graphs and jquery scripts (graph.js)). 
The number of html files is one (index.html).

Running the code locally : The data is already downloaded and being static. Therefore one needs to visualise it relative to the Hub one will choose (CZ, SK provided). At the top, there is info that can be
displayed about how to examine/read the page. Automatically the first page loaded is the CZ (Czech Republic). If one wants to switch to SK (Slovakia), there is the Hub Selector dropdown and display button. Once
info is getting displayed, graphs with cross filtering apply and a helper dropdown button to filter per month.

## Credits


### Content

- The data folder information for this website were obtained from the ftp server of the [ENTSOE Transparency Platform](https://entsoe.zendesk.com/hc/en-us/articles/115000173266-Overview-of-data-download-options-on-Transparency-Platform).
- All other text has been self inspired.

### Media

- Same as above in content section. 

### Acknowledgements

- I received inspiration for this project from myself working at the Power Industry for several years and visually from the [French National Grid RTE](http://clients.rte-france.com/lang/an/visiteurs/vie/tableau_de_bord.jsp?dashMode)