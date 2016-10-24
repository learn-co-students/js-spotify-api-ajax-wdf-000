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
  // limit to first 10 tracks
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  return tracks.map( track => track.popularity );
}

function extractNames(tracks) {
  return tracks.map( track => track.name );
}

function chartData(labels, inputData) {
  dataSetProperties.label = 'Chart data';
  dataSetProperties.data = inputData;

  var outputData = {
    labels: labels,
    datasets: [
      dataSetProperties
    ]
  };

  return outputData;
}

function getSpotifyTracks(callback) {
  $.get(url, response => callback(response) );
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  // $.ajax({
  //   url: url,
  //   dataType: 'jsonp',
  //   success: function(response) {
  //     callback(response);
  //   }
  // });
}

function success(parsedJSON) {
  let tracks = extractTop10Tracks(parsedJSON.tracks);
  let names = extractNames(tracks);
  let popularity = extractPopularity(tracks);
  let dataForChart = chartData(names, popularity);
  let canvas = $('#spotify-chart')[0]; // get the actual canvas element out of the array
  let ctx = canvas.getContext('2d');

  return new Chart(ctx).Bar(dataForChart);
}
