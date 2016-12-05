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
  // your code here
  return tracks;
}

function extractPopularity(tracks) {
  // your code here
  var array = $.map(tracks, function(element, index) {
    return element.popularity;
  });
  return array;
}

function extractNames(tracks) {
  // your code here
  var array = $.map(tracks, function(element, index) {
    return element.name;
  });
  return array;
}

function chartData(labels, inputData) {
  // your code here
  var data = {};  
  data["labels"] = labels;
  data["datasets"] = [];
  data["datasets"].push(dataSetProperties);
  data["datasets"]["label"] = "Songs";
  data["datasets"][0]["data"] = inputData;

  return data;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  $.ajax({
    url: url,
    success: function(result) {
      callback(result);
    }
  });
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
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

  var top = extractTop10Tracks(parsedJSON);
  var pop = extractPopularity(top);
  var names = extractNames(top);
  var data = chartData(names, pop);
  var ctx = $('#spotify-chart').get(0).getContext("2d");

  var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
  });
}
