// Demographics charts
// Call api
// fetch('127.0.0.1:5000/api/demographics')
//     .then(response => response.json())
//     .then(data => {
//         // Process the data and use it in your visualization
//         console.log(data);
//     })
//     .catch(error => console.error('Error:', error));

// Creating the piechart function
function createPieChart(data, year) {
    // Filter the data for the selected year and 'all donors'
    let yearData = data.filter(d => d.transplant_year === year && d.donor_type === 'All Donors');

    // Sum up the male and female counts
    let maleCount = yearData[0].male;
    let femaleCount = yearData[0].female;

    // Define the data for the pie chart
    let pieData = [{
        values: [maleCount, femaleCount],
        labels: ['Male', 'Female'],
        type: 'pie'
    }];

    // Define the layout for the pie chart
    let layout = {
        title: 'Donor Sex Distribution in ' + year,
        height: 400,
        width: 500
    };

    // Render the pie chart
    Plotly.newPlot('pie1', pieData, layout);
}


// Use d3 to fetch the data 
d3.json("http://127.0.0.1:5000/api/demographics").then(function(data) {
    console.log(data);
    createPieChart(data, 2017); // Example year

    // Add event listener for the dropdown to update the chart
    document.getElementById('selDataset').addEventListener('change', function() {
        createPieChart(data, parseInt(this.value));
    });
}).

    catch(function(error) {
    console.error('Error fetching data: ', error);
});

