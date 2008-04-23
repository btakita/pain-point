require("/specs/spec_helper");

function PainPointSpec() {}
Spec.register(PainPointSpec);

PainPointSpec['before each'] = function() {
}

PainPointSpec['after each'] = function() {
  PainPoint.instances = [];
}

PainPointSpec.describe(".sync", {
  "sets instances with newly instantiated PainPoint objects with the passed in values": function() {
    var data = [
      {id: 1, name: "Pain Point 1", vote_state: "neutral"},
      {id: 2, name: "Pain Point 2", vote_state: "up"},
      {id: 3, name: "Pain Point 3", vote_state: "down"}
    ];
    PainPoint.sync(data);
    value_of(PainPoint.instances).should_be([
      new PainPoint(data[0]),
      new PainPoint(data[1]),
      new PainPoint(data[2])
    ]);
  }
});