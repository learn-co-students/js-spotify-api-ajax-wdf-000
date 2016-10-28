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

function extractTop10Tracks(json) {
  return json.tracks.slice(0,10)
}

function extractPopularity(tracks) {
  return tracks.map(track => track.popularity)
}

function extractNames(tracks) {
  return tracks.map(track => track.name)
}

function chartData(labels, inputData) {
  var obj = {labels: labels, datasets: [
    {label: "Data",
    fillColor: dataSetProperties.fillColor,
    strokeColor: dataSetProperties.strokeColor,
    highlightFill: dataSetProperties.highlightFill,
    highlightStroke: dataSetProperties.highlightStroke,
    data: inputData,
    }]};
  return obj;
  /* #chartData returns an object where the attribute `labels` points to the first param,
  the attribute `datasets` points to an array of objects, the first of which has six attributes,
  1) label 2) fillColor 3) strokeColor 4) highlightFill 5) highlightStroke and 6) data, data points to the second param */
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  $.get(url, response => callback(response))
}
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps


function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var info = chartData(names, popularity)
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var chart = new Chart(ctx).Bar(info);
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
