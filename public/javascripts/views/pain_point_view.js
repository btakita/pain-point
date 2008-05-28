(function() {
  window.PainPointView = {
    'create': function(pain_point) {
      var view = $("<li>");
      view.html(pain_point.name);
      return view;
    }
  }
})();
