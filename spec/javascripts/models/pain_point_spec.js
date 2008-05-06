require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPoint", function() {
    var pain_point;
    describe(".sync", function() {
      it("sets instances with newly instantiated PainPoint objects with the passed in values", function() {
        var data = [
          {id: 1, name: "Pain Point 1", vote_state: "neutral"},
          {id: 2, name: "Pain Point 2", vote_state: "up"},
          {id: 3, name: "Pain Point 3", vote_state: "down"}
        ];
        PainPoint.sync(data);
        expect(PainPoint.instances).to(equal, [
          new PainPoint(data[0]),
          new PainPoint(data[1]),
          new PainPoint(data[2])
        ]);
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

      it("sets PainPoint attributes to the data returned by the server", function() {
        expect(pain_point.name).to_not(equal, 'another name');
        expect(pain_point.vote_state).to(equal, 'neutral');
        pain_point.up_vote();
        ActiveAjaxRequests[0].success(
          {id: pain_point.id, name: 'another name', vote_state: 'up'}
        );
        expect(pain_point.name).to(equal, 'another name');
        expect(pain_point.vote_state).to(equal, 'up');
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
          {id: pain_point.id, name: 'another name', vote_state: 'down'}
        );
        expect(pain_point.name).to(equal, 'another name');
        expect(pain_point.vote_state).to(equal, 'down');
      });
    });
  });
});
