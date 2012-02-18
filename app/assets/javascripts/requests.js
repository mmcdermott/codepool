

$(function(){
  $('#github-issue').submit(requestIssue);
});

function requestIssue(evt) {
  $('#github-issue').hide();
  if (evt.isDefaultPrevented()) return;
  evt.preventDefault();
  $('#github-issue-details').spin();
  var issueUrl = $('#github-issue-url').val();
  issueUrl = URI(issueUrl);
  var pathname = issueUrl.pathname().substring(1); // omit leading slash
  var parts = pathname.split('/');
  var username     = parts[0];
  var project      = parts[1];
  var resourceType = parts[2];
  var number       = parts[3];

  var issue;
  if (resourceType.match(/issue/i)) {
    issue = gh.issue(username,project,number).show(function(res){
      showIssue(res.issue,username,project);
    });
  } else {
    console.log('unsupported url right now');
  }

}

function showIssue(issue) {
  $('#github-issue-details').spin(false);
  var source   = $("#github-issue-template").html();
  var template = Handlebars.compile(source);
  var output = template(issue);
  $('#github-issue-details').prepend(output);
  $('#request_title').val(issue.title);
  $('#request_original_issue').val(issue.html_url);
  $('#request_description').val(issue.body);
  $('#github-issue-details form').show();
}

$(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  stripe.setup();
});

var stripe = (function() {
  var token;
  var spinner;
  var uid;
  var pid;

  var self = {
    setup : setup,
    processCard : processCard,
    handleStripeResponse : handleStripeResponse
  };

  function setup() {
    pid = $('#request-id').val();
    uid = $('#user-id').val();
    spinner = new Spinner();

    $('#stripe-form').submit(function(){
      if (!($('#stripe-pledgeAmount').val() > 0)) return false;
      var hasToken = $('#user-hasToken').val() === '1';
      if (!hasToken)  {
        $('#creditCardFields').fadeIn();
        return false;
      } else {
        return true;
      }
    });

    $('#stripe-submit').click(submitCard);

    $('#stripe-submitPledge').click(submitPledge);
  }

  function submitCard() {
    $('#stripe-error').text('');
    $('#stripe-submit').attr('disabled',true);
    if ($('#stripe-ccNumber').length) {
      self.processCard();
      return false
    } else {
      return true
    }
  }

  function processCard() {
    card = {
      number   : $('#stripe-ccNumber').val(),
      cvc      : $('#stripe-ccCode').val(),
      expMonth : $('#stripe-ccMonth').val(),
      expYear  : $('#stripe-ccYear').val()
    }
    spinner.spin($('#stripe-form')[0])
    Stripe.createToken(card, self.handleStripeResponse);
  }

  function handleStripeResponse(status, response) {
    console.log(status,response);
    spinner.stop();
    if (status == 200) {
      $('#stripe-token').val(response.id);
      $('#user-hasToken').val('1');
      $('#creditCardFields').fadeOut(function(){
         $('#stripe-form')[0].submit();
      })
    } else {
      $('#stripe-error').text(response.error.message);
      $('#stripe-submit').attr('disabled',false);
    }
  }

  function submitPledge() {
    var token = $('#stripe-token').val();
    var amount = $('#stripe-pledgeAmount').val();
  }

  return self;
})();

