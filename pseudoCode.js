// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {
  // Save the element, value, and id of the filter that was changed
  // Using "this" we can dynamically target each filter
  let filterinput = d3.select(this);
  // d3.select(foo).attr("bar")
  let inputId = filterinput.attr("id");
  let inputValue = filterinput.property("value");
  // If a filter value was entered then add that filterId and value
  // to the filters object. 
  if (inputValue !== "") {
    filters[inputId] = inputValue;
  } else {
    delete filters[inputId];

  }
  console.log("40: ", inputId, inputValue);

  // Call function to apply all filters and rebuild the table
  filterTable(filters);
}

function filterTable(filters) {
  let filteredData = tableData;
  console.log("filters: ", filters);
  // Set the filteredData to the tableData
  // console.log("date: ", filters["datetime"]);
  // if (date) {
  // filteredData = filteredData.filter((row) => row.datetime === date);
  // }
  // Loop through all of the filters
  Object.entries(filters).forEach(([key, value]) => {
    //  console.log(`${key} ${value}`);
    // keep any data that matches the filter values
    // start with all data,
    filteredData = filteredData.filter(row => row[key] === value);
  });

  console.log(filteredData);
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
// d3.selectAll("input").on("change", change);
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
