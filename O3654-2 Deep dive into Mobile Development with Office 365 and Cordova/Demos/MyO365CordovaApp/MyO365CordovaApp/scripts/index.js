﻿
(function () {
  "use strict";

  document.addEventListener('deviceready', onDeviceReady.bind(this), false);

  function onDeviceReady() {
    // app start up code goes here
    $("#cmdGetContacts").click(onGetContacts);
  };


  function onGetContacts() {
    var authContext = new O365Auth.Context();
    authContext.getIdToken("https://outlook.office365.com/").then(function (token) {
      var accessTokenFn = token.getAccessTokenFn('https://outlook.office365.com');
      var client = new Exchange.Client('https://outlook.office365.com/ews/odata', accessTokenFn);
      client.me.contacts.getContacts().fetch().then(onContactsReceived);
    })
  }

  function onContactsReceived(contacts) {
    for (var i = 0; i < contacts.currentPage.length; i++) {
      var currentContact = contacts.currentPage[i];
      var currentContactName =
        currentContact.surname + ", " + currentContact.givenName;
      var contactDiv = $("<div>").text(currentContactName);
      $("#status").append(contactDiv);
    }
  }

})();