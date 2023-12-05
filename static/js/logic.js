// Demographics charts
// Call api
fetch('/api/demographics')
    .then(response => response.json())
    .then(data => {
        // Process the data and use it in your visualization
        console.log(data);
    })
    .catch(error => console.error('Error:', error));