(function(window) {
  window.PainPointsView = function PainPointsView() {
  }

  PainPointsView.prototype.render = function() {
    var b = new XmlBuilder({binding: this});
    b.ul();
    var content = $(b.toString());

    for(var i=0; i < PainPoint.instances.length; i++) {
      content.append(new PainPointView(PainPoint.instances[i]).render());
    }
    return content;
  }
})(this);