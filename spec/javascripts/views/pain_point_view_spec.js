require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointView", function() {
    var pain_point;
    describe("#render", function() {
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 55});
      })

      it("renders a li element with an up vote, down vote, and an edit link", function() {
        var output = PainPointView.create(pain_point);
        expect(output.find("a.up")).to_not(be_empty);
        expect(output.find("a.down")).to_not(be_empty);
        expect(output.find("a[@href='/pain_points/1/edit']")).to_not(be_empty);
      });

      describe("PainPoint#score", function() {
        it("renders the score", function() {
          var output = PainPointView.create(pain_point);
          expect(output.html()).to(match, pain_point.score.toString());
        });
      });

      describe("PainPoint#vote_state", function() {
        describe("when neutral", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
          });

          it("renders neither the up vote or down vote link as selected", function() {
            var output = PainPointView.create(pain_point);
            expect(output.find("a.up.selected")).to(be_empty);
            expect(output.find("a.down.selected")).to(be_empty);
          });
        });

        describe("when up", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "up", score: 1});
          });

          it("renders the up vote link as selected", function() {
            var output = PainPointView.create(pain_point);
            expect(output.find("a.up.selected")).to_not(be_empty);
            expect(output.find("a.down.selected")).to(be_empty);
          });
        });

        describe("when down", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "down", score: -1});
          });

          it("renders the down vote link as selected", function() {
            var output = PainPointView.create(pain_point);
            expect(output.find("a.up.selected")).to(be_empty);
            expect(output.find("a.down.selected")).to_not(be_empty);
          });
        });
      });

    });

    describe("#up_vote.click", function() {
      var output;
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
        output = PainPointView.create(pain_point);
      });

      it("sends a POST to /pain_points/:pain_point_id/up_vote", function() {
        output.find("a.up").click();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(request.url).to(equal, '/pain_points/1/up_vote');
      });

      describe("when the server responds with a vote_state of up", function() {
        it("adds the 'selected' up vote link css class and removes 'selected' from the down vote link css class", function() {
          output.find("a.down").addClass("selected");
          expect(output.find("a.up.selected")).to(be_empty);
          expect(output.find("a.down.selected")).to_not(be_empty);
          output.find("a.up").click();
          ActiveAjaxRequests[0].success(
            {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "up"}}
          );

          expect(output.find("a.up.selected")).to_not(be_empty);
          expect(output.find("a.down.selected")).to(be_empty);
        });
      });

      describe("when the server responds with a vote_state of neutral", function() {
        it("removes the 'selected' up vote link and down vote link css classes", function() {
          output.find("a.up").addClass("selected");
          expect(output.find("a.up.selected")).to_not(be_empty);
          output.find("a.down").addClass("selected");
          expect(output.find("a.down.selected")).to_not(be_empty);

          output.find("a.up").click();
          ActiveAjaxRequests[0].success(
            {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "neutral"}}
          );

          expect(output.find("a.up.selected")).to(be_empty);
          expect(output.find("a.down.selected")).to(be_empty);
        });
      });
    })

    describe("#down_vote.click", function() {
      var output;
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
        output = PainPointView.create(pain_point);
      });

      it("sends a POST to /pain_points/:pain_point_id/down_vote", function() {
        output.find("a.down").click();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(request.url).to(equal, '/pain_points/1/down_vote');
      });

      describe("when the server responds with a vote_state of down", function() {
        it("adds the 'selected' down vote link css class and removes the 'selected' up vote link css class", function() {
          output.find("a.up").addClass('selected');
          expect(output.find("a.up.selected")).to_not(be_empty);
          expect(output.find("a.down.selected")).to(be_empty);
          output.find("a.down").click();
          ActiveAjaxRequests[0].success(
            {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "down"}}
          );

          expect(output.find("a.up.selected")).to(be_empty);
          expect(output.find("a.down.selected")).to_not(be_empty);
        });
      });

      describe("when the server responds with a vote_state of neutral", function() {
        it("removes the 'selected' down vote and up vote link css class", function() {
          output.find("a.up").addClass("selected");
          output.find("a.down").addClass("selected");
          expect(output.find("a.up.selected")).to_not(be_empty);
          expect(output.find("a.down.selected")).to_not(be_empty);
          output.find("a.down").click();
          ActiveAjaxRequests[0].success(
            {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "neutral"}}
          );

          expect(output.find("a.up.selected")).to(be_empty);
          expect(output.find("a.down.selected")).to(be_empty);
        });
      });
    });
  });
});
