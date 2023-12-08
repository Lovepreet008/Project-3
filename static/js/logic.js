
// Creating the sex distribution pie chart 
function createPieChart1(data, year) {
    // Filter the data for the selected year and 'all donors'
    let yearData = data.filter(d => d.transplant_year === year && d.donor_type === 'All Donors');

    // Save the male and female count
    let maleCount = yearData[0].male;
    let femaleCount = yearData[0].female;

    // Define the data for the pie chart
    let pieData = [{
        values: [maleCount, femaleCount],
        labels: ['Male', 'Female'],
        type: 'pie',
        marker: {
            colors: ['light blue', 'pink']}
    }];

    // Define the layout 
    let layout = {
        title: 'Donor Sex Distribution in ' + year,
        height: 400,
        width: 500
    };

    // Render the pie chart
    Plotly.newPlot('pie1', pieData, layout);
}


// Creating an age distribution histogram 

function createHistogram(data, year) {
    // Filter the data for the selected year and 'all donors'
    let yearData = data.filter(d => d.transplant_year === year && d.donor_type === 'All Donors');
    // save the count for each age group 
    let pediatric = yearData[0].pediatric;
    let age18_30 = yearData[0].age_18_30;
    let age31_40 = yearData[0].age_31_40;
    let age41_50 = yearData[0].age_41_50;
    let age51_60 = yearData[0].age_51_60;
    let age61_plus = yearData[0].age_61_plus;

    // Define the trace of histogram
    let trace = {
        x: ['Below 18', '18-30', '31-40', '41-50', '51-60', '61+'],
        y: [pediatric, age18_30, age31_40, age41_50, age51_60, age61_plus],
        type: 'bar'
    } 

    // Define the layout for histogram
    let layout = {
        title: 'Donor Age Distribution in ' + year,
        xaxis: {title: 'Age Group'},
        yaxis: {title: 'Count'},
        bargap: 0.2}
    
        // Render the pie chart
    Plotly.newPlot('histogram', [trace], layout);
    
    }


// Creating race/ethnicity distribution function
function createPieChart2(data, year) {
    // Filter the data for the selected year and 'all donors'
    let yearData = data.filter(d => d.transplant_year === year && d.donor_type === 'All Donors');

    // Save count for each race
    let white = yearData[0].white;
    let black = yearData[0].black;
    let hispanic = yearData[0].hispanic;
    let asian = yearData[0].asian;
    let american_indian = yearData[0].american_indian;
    let native_hawaiian = yearData[0].native_hawaiian;
    let multiracial = yearData[0].multiracial; 

    // Define the data for the pie chart
    let pie2Data= [{
        values : [white, black, hispanic, asian, american_indian, native_hawaiian, multiracial],
        labels: ['White', 'Black', 'Hispanic', 'Asian', 'Native American', 'Native Hawaiian', 'Multiracial'],
        type: 'pie'
    }]

    // Define the layout
    let layout = {
        title: 'Donor Ethnicity Distribution in ' + year,
        height: 400,
        width: 500
    }; 

    // Render the pie chart
    Plotly.newPlot('pie2', pie2Data, layout);

}

// Use d3 to fetch the data 
d3.json("http://127.0.0.1:5000/api/demographics").then(function(data) {
    console.log(data);
    createPieChart1(data, 2017); 
    createPieChart2(data, 2017);
    createHistogram(data, 2017);

    // Add event listener for the dropdown to update the chart
    document.getElementById('selDataset').addEventListener('change', function() {
        createPieChart1(data, parseInt(this.value));
        createPieChart2(data, parseInt(this.value));
        createHistogram(data, parseInt(this.value));
    });
}).

    catch(function(error) {
    console.error('Error fetching data: ', error);
});

