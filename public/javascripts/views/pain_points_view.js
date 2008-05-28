(function() {
  window.PainPointsView = {
    'create': function() {
      var view = $("<ul>");
      for(var i=0; i < PainPoint.instances.length; ++i) {
        view.append(PainPointView.create(PainPoint.instances[i]));
      }
      return view;
    }
  }
})();
