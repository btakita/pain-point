(function(window) {
  var PainPointViewBuilder = function PainPointViewBuilder(pain_point) {
    this.pain_point = pain_point;
    XmlBuilder.apply(this);
  }
  PainPointViewBuilder.prototype = XmlBuilder.prototype;

  PainPointViewBuilder.prototype.render = function() {
    with(this) {
      li(function() {
        vote_link("up");
        text(" ");
        vote_link("down");
        text(" ");
        a(pain_point.name, {'href': pain_point.url() + "/edit"});
      });
      return toString();
    }
  }

  PainPointViewBuilder.prototype.vote_link = function(direction) {
    var css_class = direction;
    if(this.pain_point.vote_state == direction) {
      css_class += " selected";
    }
    this.a({'class': css_class});
  }

  window.PainPointView = {
    'create': function(pain_point) {
      var view = $(new PainPointViewBuilder(pain_point).render());
      view.find("a.up").click(function() {
        $.post(pain_point.url() + "/up_vote");
      });
      view.find("a.down").click(function() {
        $.post(pain_point.url() + "/down_vote");
      });
      return view;
    }
  }
})(this);