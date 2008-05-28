(function($) {
  window.PainPointView = {
    'create': function(pain_point) {
      var builder = new XmlBuilder({binding: this});
      with(builder) {
        li(function() {
          a('up', {href: '#'});
          a('down', {href: '#'});
          span(pain_point.name);
        });
      };
      var view = $(builder.toString());
      view.up_vote = view.find("a:first");
      view.up_vote.click(function() {
        $.post("/pain_points/" + pain_point.id + "/up_vote");
      });
      view.down_vote = view.find("a:last");
      view.down_vote.click(function() {
        $.post("/pain_points/" + pain_point.id + "/down_vote");
      });
      return view;
    }
  }
})(jQuery);
