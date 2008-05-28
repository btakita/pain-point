(function() {
  window.PainPointsView = {
    'create': function() {
      var builder = new XmlBuilder({binding: this});
      with(builder) {
        ul(function() {
          for(var i=0; i < PainPoint.instances.length; ++i) {
            li(PainPoint.instances[i].name);
          }
        });
      }
      return $(builder.toString());
    }
  }
})();
