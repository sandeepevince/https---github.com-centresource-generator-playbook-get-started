/**
 * Initializations and options for checkout.
 *
 */

(function () {
  var init = function () {
    // Add Shipping Same as Billing Checkbox
    $('<input class="shipping-billing" type="checkbox" value="shipping-billing" checked>My Shipping Address and Billing address are the same</input>').prependTo('.billing.group').change(function() {
      $('.billing.group').toggleClass('active');
    });

    // Active states in checkout form
    $('<span class="bg"></span>').prependTo('.billing.group');

  }

  TonyRobbins.Checkout = function () {
    init();
  }
}(this));
