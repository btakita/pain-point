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
        expect(view.html()).to(equal, pain_point.name);
      });
    });
  });
});
