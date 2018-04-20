// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
$(function() {
  console.log('hello world :o')

  jQuery.get('/currency', function(dreams) {
    var dataPoints = [];
    var options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Japanese Yen (JPY) "+formatReadableDate(new Date())
      },
      axisX: {
        valueFormatString: "H:mm:ss",
      },
      axisY: {
        title: "JPY",
        titleFontSize: 24,
        includeZero: false
      },
      data: [{
        type: "spline",
        yValueFormatString: "0.0#####",
        dataPoints: dataPoints
      }]
    };
    console.log(formatDate());
    //console.log(dreams)
    dreams.forEach(function(dream) {
      var tr = $('<tr>');
      $('<td></td>').text(dream.date_time).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.jpy).toFixed(6)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.usd).toFixed(3)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.sgd).toFixed(3)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.aud).toFixed(3)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.thb).toFixed(4)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.cny).toFixed(4)).appendTo(tr);
      $('<td></td>').text(parseFloat(dream.twd).toFixed(4)).appendTo(tr);
      tr.appendTo($('#currency>tbody'));
    })
    var table = $('#currency').DataTable({
      responsive: true,
      "order": [
        [0, "desc"]
      ]
    });

    for (var i = 0; i < dreams.length; i++) {
      if(dreams[i].date_time.substr(0, dreams[i].date_time.indexOf(' ')) === formatDate()){
        dataPoints.push({
          x: new Date(dreams[i].date_time),
          y: dreams[i].jpy
        });
      }
    }
    new $.fn.dataTable.FixedHeader(table);
    $("#chartContainer").CanvasJSChart(options);
  })

  function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function formatReadableDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

  $('form').submit(function(event) {
    event.preventDefault()
    var dream = $('input').val()
    $.post('/dreams?' + $.param({
      dream: dream
    }), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams')
      $('input').val('')
      $('input').focus()
    })
  })

})
