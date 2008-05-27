require("/specs/spec_helper");

function PainPointsViewSpec() {}
Spec.register(PainPointsViewSpec);

PainPointsViewSpec['before each'] = function() {
  PainPointsViewSpec.pain_points = [
  ];
  PainPointsViewSpec.view = new PainPointsView.create();
}

