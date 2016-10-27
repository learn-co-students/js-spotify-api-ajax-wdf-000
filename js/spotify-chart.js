var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";
///Added these
var tracks;
var names = [];
var popularities = [];
var data;

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  return $.map(tracks, function(track, index){
    return parseInt(track.popularity);
  });
}

function extractNames(tracks) {
  return $.map(tracks, function(track, index){
    return track.name;
  });
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: 'rgba(220,220,220,0.5)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: inputData,
        }
    ]
  };
  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(music){
      callback(music)
    }
  });
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!

  tracks = extractTop10Tracks(parsedJSON.tracks);    // this is an array of objects
  popularities = extractPopularity(tracks);  // this is an array of integers
  names = extractNames(tracks);   // this is an array of song names
  data = chartData(names, popularities);

  ///testing...
    // console.log(tracks.length);
  // $.each(popularities, function(index, popularity){
  //   console.log(names[index]);
  //   console.log(popularity);
  // });


  var ctx = document.getElementById('spotify-chart').getContext('2d');
  new Chart(ctx).Bar(data);
}
