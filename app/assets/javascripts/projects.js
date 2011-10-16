
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
    pid = $('#project-id').val();
    uid = $('#user-id').val();
    spinner = new Spinner();
    hasToken = $('#user-hasToken').val() === '1';
    
    if (hasToken) $('#pledgeBox').fadeIn();
    else          $('#creditCardFields').fadeIn();
    
    $('#stripe-submit').click(function() {
      $('#stripe-error').text('');
      $('#stripe-submit').attr('disabled',true);
      if ($('#stripe-ccNumber').length) {
        self.processCard();
        return false
      } else {
        return true
      }
    });

    $('#stripe-submitPledge').click(submitPledge);
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
      $('#creditCardFields').fadeOut(function(){$('#pledgeBox').fadeIn()})
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
