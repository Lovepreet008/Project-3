// Demographics charts
// Call api
// fetch('127.0.0.1:5000/api/demographics')
//     .then(response => response.json())
//     .then(data => {
//         // Process the data and use it in your visualization
//         console.log(data);
//     })
//     .catch(error => console.error('Error:', error));

d3.json("http://127.0.0.1:5000/api/demographics").then(function(data) {
    console.log(data);
});
