require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointsView", function() {
    var pain_points, view;
    before(function() {
      PainPoint.instances = [
        new PainPoint({id: 1, name: "Tests are slow", vote_state: "up"}),
        new PainPoint({id: 2, name: "Software Complexity", vote_state: "neutral"})
      ];
      pain_points = PainPoint.instances;
    });

    after(function() {
      PainPoint.instances = [];
    });

    describe(".create", function() {
      before(function() {
        view = PainPointsView.create();
      });

      it("renders all of the PainPoints as lis inside of a ul", function() {
        expect(view[0].tagName.toUpperCase()).to(match, "UL");
        expect(view.html()).to(match, pain_points[0].name);
        expect(view.html()).to(match, pain_points[1].name);
      });
    });
  });
});
