require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointView", function() {
    var pain_point, view;
    before(function() {
      pain_point = new PainPoint({id: 1, name: "Tests are slow", vote_state: "up"});
    });

    describe(".create", function() {
      before(function() {
        view = PainPointView.create(pain_point);
      });

      it("render the PainPoint within a ul tag", function() {
        expect(view[0].tagName.toUpperCase()).to(match, "LI");
        expect(view.html()).to(match, pain_point.name);
      });

      describe(".up_vote", function() {
        var link;
        before(function() {
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
