require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPoint", function() {
    var pain_point;
    describe(".sync", function() {
      it("sets instances with newly instantiated PainPoint objects with the passed in values", function() {
        var data = [
          {type: "PainPoint", attributes: {id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0}},
          {type: "PainPoint", attributes: {id: 2, name: "Pain Point 2", vote_state: "up", score: 5}},
          {type: "PainPoint", attributes: {id: 3, name: "Pain Point 3", vote_state: "down", score: -5}}
        ];
        PainPoint.sync(data);
        expect(PainPoint.instances).to(equal, [
          new PainPoint(data[0].attributes),
          new PainPoint(data[1].attributes),
          new PainPoint(data[2].attributes)
        ]);
      });
    });

    describe("constructor", function() {
      it("sets the passed in attributes", function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 9});
        expect(pain_point.id).to(equal, 1);
        expect(pain_point.name).to(equal, "Pain Point 1");
        expect(pain_point.vote_state).to(equal, "neutral");
        expect(pain_point.score).to(equal, 9);
      });
    });

    describe("#window", function() {
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
      });

      it("equals the document.window", function() {
        expect(window.location).to_not(equal, undefined);
        expect(window.location).to_not(equal, null);
        expect(pain_point.location).to(equal, window.location);
      });
    });

    describe("#url", function() {
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
      });

      it("returns the url of the PainPoint (/pain_points/:pain_point_id)", function() {
        expect(pain_point.url()).to(equal, "/pain_points/1");
      });
    });

    this["when the server responds with a Login"] = function(method_name) {
      describe("when the server responds with a Login", function() {
        describe("when passing in a callback", function() {
          it("invokes the callback with the Login instance", function() {
            var callback_object;
            var callback = function(object) {
              callback_object = object;
            }
            pain_point[method_name](callback);

            ActiveAjaxRequests[0].success({"type": "Login"});
            expect(callback_object).to(equal, {"type": "Login"})
          });
        });

        describe("when not passing in a callback", function() {
          it("does nothing", function() {
            pain_point[method_name]();
            ActiveAjaxRequests[0].success({"type": "Login"});
          });
        });
      });
    }

    describe("#up_vote", function() {
      before(function() {
        window._token = "foobar";
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
      });

      it("sends a POST to /pain_points/:pain_point_id/up_vote with the authenticity_token that expects json", function() {
        pain_point.up_vote();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(JSON.parse(request.data)).to(equal, {authenticity_token: window._token});
        expect(request.url).to(equal, '/pain_points/1/up_vote');
        expect(request.content_type).to(equal, "application/json");
      });

      describe("server response", function() {
        it("sets PainPoint attributes to the data returned by the server", function() {
          expect(pain_point.name).to_not(equal, 'another name');
          expect(pain_point.vote_state).to(equal, 'neutral');
          pain_point.up_vote();
          ActiveAjaxRequests[0].success(
            {'type': "PainPoint", 'attributes': {id: pain_point.id, name: 'another name', vote_state: 'up', score: 5}}
          );
          expect(pain_point.name).to(equal, 'another name');
          expect(pain_point.vote_state).to(equal, 'up');
          expect(pain_point.score).to(equal, 5);
        });

        this["when the server responds with a Login"]('up_vote');
      });

    });

    describe("#down_vote", function() {
      before(function() {
        window._token = "foobar";
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
      });

      it("sends a POST to /pain_points/:pain_point_id/down_vote with the authenticity_token that expects json", function() {
        pain_point.down_vote();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(JSON.parse(request.data)).to(equal, {authenticity_token: window._token});
        expect(request.url).to(equal, '/pain_points/1/down_vote');
        expect(request.content_type).to(equal, "application/json");
      });

      it("sets PainPoint attributes to the data returned by the server", function() {
        expect(pain_point.name).to_not(equal, 'another name');
        expect(pain_point.vote_state).to(equal, 'neutral');
        pain_point.down_vote();
        ActiveAjaxRequests[0].success(
          {'type': "PainPoint", 'attributes': {id: pain_point.id, name: 'another name', vote_state: 'down'}}
        );
        expect(pain_point.name).to(equal, 'another name');
        expect(pain_point.vote_state).to(equal, 'down');
      });

      this["when the server responds with a Login"]('down_vote');
    });
  });
});
