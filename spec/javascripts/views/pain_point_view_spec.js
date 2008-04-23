require("/specs/spec_helper");

function PainPointViewSpec() {}
Spec.register(PainPointViewSpec);

PainPointViewSpec['before each'] = function() {
}

PainPointViewSpec['after each'] = function() {
  PainPoint.instances = [];
}

PainPointViewSpec.describe("#render", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
    PainPointViewSpec.view = new PainPointView(PainPointViewSpec.pain_point);
  },

  "renders a li element with an up vote, down vote, and an edit link": function() {
    var output = PainPointViewSpec.view.render();
    value_of(output.find("a.up")).should_not_be_empty();
    value_of(output.find("a.down")).should_not_be_empty();
    value_of(output.find("a[@href='/pain_points/1/edit']")).should_not_be_empty();
  }
});