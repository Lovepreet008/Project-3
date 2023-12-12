let url="http://127.0.0.1:5000/api/national";
       


function init(data) {
    let dropdownMenu = d3.select("#selDataset0");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");

    let setOrgan= data.filter(item => item.organ === dataset);
    if (setOrgan){
      console.log(setOrgan);
      let deceasedOrganRecovered=setOrgan.map(item=> item.number_of_deceased_organ_donors_recovered);
      let livingOrganRecovered= setOrgan.map(item=> item.number_of_living_organ_donors_recovered);                        
      var trace1={
        x: setOrgan.map(item=>item.year),
        y: deceasedOrganRecovered,
        type: 'bar',
        name: 'No. of deceased donor',       
        marker: {
          color: '#7f8a90' 
      }
      };

      var trace2={
        x: setOrgan.map(item=>item.year),
        y: livingOrganRecovered,
        type: 'bar',
        name: 'No. of living donor',
        marker: {
          color: '#759a9f'
      }        
      };
      var data1=[trace1, trace2 ];
      var layout1={
        title: 'Living vs Deceased Organ Donor',
        xaxis: {
          title: 'Years'
        },
        yaxis: {
          title: 'No. of Donors',
        },
        plot_bgcolor: '#a6bac0', 
        paper_bgcolor: '#a6bac0'
      };

      Plotly.newPlot("bar1", data1, layout1);
      var trace3={
        x: setOrgan.map(item=>item.year),
        y: setOrgan.map(item=> item.number_of_deceased_donor_organ_transplant_recipients),
        type: 'bar',
        name: 'No. of deceased donor organ recipients',
        marker: {
          color: '#7f8a90' 
      }

      };

      var trace4={
        x: setOrgan.map(item=>item.year),
        y: setOrgan.map(item=> item.number_of_living_donor_organ_transplant_recipients),
        type: 'bar',
        name: 'No. of living donor organ recipients',
        marker: {
          color: '#759a9f'
      }
        
      };
      var data2=[trace3, trace4];
      var layout2={
        title: 'Living vs Deceased Organ Recipients',
        xaxis: {
          title: 'Years',

        },
        yaxis: {
          title: 'No. of Recipients',
        },
        plot_bgcolor: '#a6bac0', 
        paper_bgcolor: '#a6bac0'
      };


      Plotly.newPlot("bar2", data2, layout2);


    }

   
  }

function updatePlot(data, part ){
  let setOrgan= data.filter(item=>item.organ === part);
  
  let y1= setOrgan.map(item=> item.number_of_deceased_organ_donors_recovered);
  let y2= setOrgan.map(item=> item.number_of_living_organ_donors_recovered);

  Plotly.restyle("bar1", "y", [y1,y2]);


  let y3= setOrgan.map(item=> item.number_of_deceased_donor_organ_transplant_recipients);
  let y4= setOrgan.map(item=> item.number_of_living_donor_organ_transplant_recipients);



  Plotly.restyle("bar2", "y", [y3,y4]);


}

d3.json(url).then(function(data) {
    console.log(data);
    init(data);


    document.getElementById('selDataset0').addEventListener('change', function() {
      updatePlot(data, this.value);
      
  });

});
    