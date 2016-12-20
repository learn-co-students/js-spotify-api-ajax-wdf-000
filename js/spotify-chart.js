var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,10);

}

function extractPopularity(tracks) {
  // your code here
  return tracks.map(track=>{
    return track.popularity
  })
}

function extractNames(tracks) {
  // your code here
  return tracks.map(track=>{
    return track.name
  })
}

function chartData(labels, inputData) {
  // your code here
  var barData;
  return barData = {
    labels: labels,
    datasets: [
        {
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: inputData
        }
    ]
  };

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    url: url,
    success: function(response){
      callback(response);
    }
  })
  // .then(response=>{
  //   debugger;
  //   callback(response);
  // })
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  var top10 = extractTop10Tracks(parsedJSON.tracks)
  //  2. extractNames -  pass it the result of #1
  var trackNames = extractNames(top10)
  //  3. extractPopularity - pass it the result of #1
  var popularity = extractPopularity(parsedJSON.tracks)
  //  4. chartData - pass it results of #2 and #3
  var barData = chartData(trackNames, popularity)
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  // var ctx = document.getElementById('spotify-chart').getContext('2d');
  // //  6. make a new bar chart!
  // var clientsChart = new Chart(ctx).Bar(barData);

  var context = document.getElementById('spotify-chart').getContext('2d');
  var clientsChart = new Chart(context).Bar(barData);
}
