'use strict';

window.TonyRobbins = {};

$(document).ready(function () {
  // Modules
  window.TonyRobbins.Carousels = new TonyRobbins.Carousels();
  window.TonyRobbins.Charts = new TonyRobbins.Charts();
  window.TonyRobbins.Checkout = new TonyRobbins.Checkout();
  window.TonyRobbins.Utilities = new TonyRobbins.Utilities();

  // Page-specific
  window.TonyRobbins.IdentityTest = new TonyRobbins.IdentityTest();
  window.TonyRobbins.MembersPortal = new TonyRobbins.MembersPortal();
});
