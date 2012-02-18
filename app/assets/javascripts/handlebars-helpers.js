Handlebars.registerHelper('time_since', function(date){
  var time = moment(date);
  return time.fromNow();
});
