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
    this.a(direction, {'class': css_class, 'href': "#"});
  }

  window.PainPointView = new Object();
  PainPointView.create = function(pain_point) {
    var view = $(new PainPointViewBuilder(pain_point).render());
    view.pain_point = pain_point;

    view.refresh_links = function(data) {
      if(this.pain_point.vote_state == "up") {
        this.find("a.up").addClass("selected");
        this.find("a.down").removeClass("selected");
      } else if(this.pain_point.vote_state == "down") {
        this.find("a.down").addClass("selected");
        this.find("a.up").removeClass("selected");
      } else {
        this.find("a.up").removeClass("selected");
        this.find("a.down").removeClass("selected");
      }
    }

    view.find("a.up").click(function() {
      pain_point.up_vote(function(pain_point) {
        view.refresh_links(pain_point);
      });
    });
    view.find("a.down").click(function() {
      pain_point.down_vote(function(data) {
        view.refresh_links(pain_point);
      });
    });
    return view;
  };
})(this);