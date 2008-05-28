(function() {
  var PainPointViewBuilder = function PainPointViewBuilder(pain_point) {
    this.pain_point = pain_point;
    XmlBuilder.apply(this);
  }
  PainPointViewBuilder.prototype = XmlBuilder.prototype;

  PainPointViewBuilder.prototype.render = function() {
    with(this) {
      li({"id": "vote_" + this.pain_point.id, "class": "vote"}, function() {
        span({"class": "score"});
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
    var css_class = "vote " + direction;
    if(this.pain_point.vote_state == direction) {
      css_class += " selected";
    }
    this.a(direction, {'class': css_class, 'href': "#"});
  }

  window.PainPointView = {};
  PainPointView.create = function(pain_point) {
    var view = $(new PainPointViewBuilder(pain_point).render());
    view.pain_point = pain_point;

    view.refresh = function(pain_point) {
      view.find('.score').html(pain_point.score.toString());
      if(pain_point.vote_state == "up") {
        view.find("a.up").addClass("selected");
        view.find("a.down").removeClass("selected");
      } else if(pain_point.vote_state == "down") {
        view.find("a.down").addClass("selected");
        view.find("a.up").removeClass("selected");
      } else {
        view.find("a.up").removeClass("selected");
        view.find("a.down").removeClass("selected");
      }
    }
    view.refresh(pain_point);

    view.find("a.up").click(function() {
      pain_point.up_vote(function(resource) {
        if(resource.type == "Login") {
          view.login = LoginView.create();
        } else {
          view.refresh(resource);
        }
      });
      return false;
    });
    view.find("a.down").click(function() {
      pain_point.down_vote(function(resource) {
        if(resource.type == "Login") {
          view.login = LoginView.create();
        } else {
          view.refresh(resource);
        }
      });
      return false;
    });
    return view;
  };
})();