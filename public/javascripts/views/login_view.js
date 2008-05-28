(function($) {
  window.LoginView = {
    'create': function() {
      var view = $("<div>");
      view.addClass('login');
      $('body').append(view);

      return view;
    }
  };
})(jQuery);