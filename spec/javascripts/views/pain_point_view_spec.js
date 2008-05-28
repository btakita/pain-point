require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointView", function() {
    var pain_point, view;
    before(function() {
      pain_point = new PainPoint({id: 1, name: "Tests are slow", vote_state: "up"});
      view = undefined;
    });

    describe(".create", function() {
      this["renders the PainPoint within a ul tag"] = function() {
        it("renders the PainPoint within a ul tag", function() {
          expect(view[0].tagName.toUpperCase()).to(match, "LI");
          expect(view.html()).to(match, pain_point.name);
        });
      };

      describe('when pain_point vote_state is up', function() {
        before(function() {
          pain_point.vote_state = "up";
          view = PainPointView.create(pain_point);
        });

        this["renders the PainPoint within a ul tag"]();

        it("sets the .up_vote link class to selected", function() {
          expect(view.up_vote.hasClass('selected')).to(equal, true);
        });

        it("does not set the .down_vote link class to selected", function() {
          expect(view.down_vote.hasClass('selected')).to(equal, false);
        });
      });

      describe('when pain_point vote_state is down', function() {
        before(function() {
          pain_point.vote_state = "down";
          view = PainPointView.create(pain_point);
        });

        this["renders the PainPoint within a ul tag"]();

        it("does not set the .up_vote link class to selected", function() {
          expect(view.up_vote.hasClass('selected')).to(equal, false);
        });

        it("sets the .down_vote link class to selected", function() {
          expect(view.down_vote.hasClass('selected')).to(equal, true);
        });
      });

      describe('when pain_point vote_state is neutral', function() {
        before(function() {
          pain_point.vote_state = "neutral";
          view = PainPointView.create(pain_point);
        });

        this["renders the PainPoint within a ul tag"]();

        it("does not set the .up_vote link class to selected", function() {
          expect(view.up_vote.hasClass('selected')).to(equal, false);
        });

        it("does not set the .down_vote link class to selected", function() {
          expect(view.down_vote.hasClass('selected')).to(equal, false);
        });
      });

      describe(".up_vote", function() {
        var link;
        before(function() {
          view = PainPointView.create(pain_point);
          link = view.up_vote;
        });

        it("is a link that says 'up' and points to #", function() {
          expect(link[0].tagName.toLowerCase()).to(equal, "a");
          expect(link.html()).to(match, "up");
          expect(link.attr('href')).to(equal, "#");
        });

        describe(".click", function() {
          it("sends a POST /pain_points/:pain_point_id/up_vote", function() {
            link.click();

            var request = ActiveAjaxRequests.shift();
            expect(request.type).to(equal, "POST");
            expect(request.url).to(equal, "/pain_points/1/up_vote");
          });
        });
      });

      describe(".down_vote", function() {
        var link;
        before(function() {
          view = PainPointView.create(pain_point);
          link = view.down_vote;
        });

        it("is a link that says 'up' and points to #", function() {
          expect(link[0].tagName.toLowerCase()).to(equal, "a");
          expect(link.html()).to(match, "down");
          expect(link.attr('href')).to(equal, "#");
        });

        describe(".click", function() {
          it("sends a POST /pain_points/:pain_point_id/down_vote", function() {
            link.click();

            var request = ActiveAjaxRequests.shift();
            expect(request.type).to(equal, "POST");
            expect(request.url).to(equal, "/pain_points/1/down_vote");
          });
        });
      });
    });
  });
});
