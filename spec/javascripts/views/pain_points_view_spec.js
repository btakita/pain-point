require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointsView", function() {
    var view;
    before(function() {
      PainPoint.instances = [
        new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0}),
        new PainPoint({id: 2, name: "Pain Point 2", vote_state: "up", score: 1}),
        new PainPoint({id: 3, name: "Pain Point 3", vote_state: "down", score: -1})
      ];
      view = PainPointsView.create();
    });

    describe("#render", function() {
      it("renders a ul with a PainPointView for each PainPoint", function() {
        expect(view.attr('tagName').toLowerCase()).to(equal, 'ul');

        var pain_point_1_html = PainPointView.create(PainPoint.instances[0]).html();
        expect(pain_point_1_html).to_not(equal, "");
        expect(view.html()).to_not(equal, "");
        expect(view.html()).to(match, pain_point_1_html);
      });
    });
  });
});