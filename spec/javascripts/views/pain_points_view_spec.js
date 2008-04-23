require("/specs/spec_helper");

function PainPointsViewSpec() {}
Spec.register(PainPointsViewSpec);

PainPointsViewSpec['before each'] = function() {
  PainPoint.instances = [
    new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"}),
    new PainPoint({id: 2, name: "Pain Point 2", vote_state: "up"}),
    new PainPoint({id: 3, name: "Pain Point 3", vote_state: "down"})
  ];
  PainPointsViewSpec.view = new PainPointsView();
}

PainPointsViewSpec['after each'] = function() {
  PainPoint.instances = [];
}

PainPointsViewSpec.describe("#render", {
  "renders a ul with a PainPointView for each PainPoint": function() {
    var output = PainPointsViewSpec.view.render();

    value_of(output.attr('tagName').toLowerCase()).should_be('ul');

    var pain_point_1_html = new PainPointView(PainPoint.instances[0]).render().html();
    value_of(pain_point_1_html).should_not_be("");
    value_of(output.html()).should_match(pain_point_1_html);
  }
});