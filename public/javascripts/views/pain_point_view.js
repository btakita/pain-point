(function(window) {
  window.PainPointView = function PainPointView(pain_point) {
    this.pain_point = pain_point;
  }

  PainPointView.prototype.render = function() {
    var b = new XmlBuilder({binding: this});
    with(b) {
      li(function() {
        a({'class': "up"});
        a({'class': "down"});
        a({'href': "/pain_points/" + this.pain_point.id + "/edit"});
      });
    };
    return $(b.toString());
  }
})(this);