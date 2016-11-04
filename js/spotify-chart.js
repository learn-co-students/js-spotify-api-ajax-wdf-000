var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  // getSpotifyTracks(success);
  getSpotifyTracks(success)
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks){
  return tracks["tracks"].slice(0, 10);
}

function extractProperty(collection, property){
  return collection.map(function(item) {
    return item[property]
  })
}

function extractPopularity(tracks) {
  return extractProperty(tracks, "popularity")
}

function extractNames(tracks) {
  return extractProperty(tracks, "name")
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: [
      {
        fillColor: 'rgba(220,220,220,0.5)', 
        strokeColor: 'rgba(220,220,220,0.8)', 
        highlightFill: 'rgba(220,220,220,0.75)', 
        highlightStroke: 'rgba(220,220,220,1)',
        borderWidth: 1,
        data: inputData
      }
    ]
  };
  return data;
}


function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    success: callback
  })
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON)
  //  2. extractNames -  pass it the result of #1
  var tracks_names = extractNames(tracks);
  //  3. extractPopularity - pass it the result of #1
  var tracks_popularity = extractPopularity(tracks);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(tracks_names, tracks_popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = document.querySelector("#spotify-chart").getContext("2d");
  //  6. make a new bar chart!
  var barChart = new Chart(ctx).Bar(data)
}
