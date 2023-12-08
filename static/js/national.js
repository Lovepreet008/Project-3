fetch('http://127.0.0.1:5000/api/national')
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        console.log(data);
        let Data=data.map(item=>item);
        


        function init() {
            let dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            let dataset = dropdownMenu.property("value");

            let nLive= Data.filter(item => item.organ === dataset);
            if (nLive){
              console.log(nLive);


                                 
              var trace1={
                x: nLive.map(item=>item.year),
                y: nLive.map(item=> item.number_of_deceased_organ_donors_recovered),
                type: 'bar',
                text: 'No. of deceased donor organ recovered'


              };

              

              var trace2={
                x: nLive.map(item=>item.year),
                y: nLive.map(item=> item.number_of_living_organ_donors_recovered),
                type: 'bar',
                text: 'No. of living donor organ recovered'
                
              };
              var data=[trace1, trace2];
              var layout={
                title: 'Living vs Deceased Organ Donor',
                xaxis: {
                  title: 'Years',

                },
                yaxis: {
                  title: 'No. of Donors',
                }
              };

              Plotly.newPlot("bar1", data, layout);


            }

          
            

            
            
            // Plotly.newPlot("bar2", data);
          }
        init();

    })
    