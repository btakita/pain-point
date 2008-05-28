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
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: "/pain_points/" + pain_point.id + "/up_vote",
          success: function(data) {
            view.refresh_links(data);
          }
        });
      });
      view.down_vote = view.find("a:last");
      view.down_vote.click(function() {
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: "/pain_points/" + pain_point.id + "/down_vote",
          success: function(data) {
            view.refresh_links(data);
          }
        });
      });

      view.refresh_links = function(pain_point) {
        if(pain_point.vote_state == 'up') {
          view.up_vote.addClass('selected');
          view.down_vote.removeClass('selected');
        } else if (pain_point.vote_state == 'down') {
          view.up_vote.removeClass('selected');
          view.down_vote.addClass('selected');
        } else {
          view.up_vote.removeClass('selected');
          view.down_vote.removeClass('selected');
        }
      };
      view.refresh_links(pain_point);

      return view;
    }
  }
})(jQuery);
