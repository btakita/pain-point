(function() {
  window.PainPointsView = {
    'create': function() {
      var b = new XmlBuilder({binding: this});
      b.ul();
      var content = $(b.toString());

      for(var i=0; i < PainPoint.instances.length; i++) {
        content.append(PainPointView.create(PainPoint.instances[i]));
      }
      return content;
    }
  };
})();