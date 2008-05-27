require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPoint", function() {
    after(function() {
      PainPoint.instances = [];
    });

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
  });
});
