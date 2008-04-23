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
  },

  "renders a li element with an up vote, down vote, and an edit link": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);
    value_of(output.find("a.up")).should_not_be_empty();
    value_of(output.find("a.down")).should_not_be_empty();
    value_of(output.find("a[@href='/pain_points/1/edit']")).should_not_be_empty();
  }
});

PainPointsViewSpec.describe("#render when the PainPoint#vote_state is neutral", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "renders neither the up vote or down vote link as selected": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);
    value_of(output.find("a.up.selected")).should_be_empty();
    value_of(output.find("a.down.selected")).should_be_empty();
  }
});

PainPointsViewSpec.describe("#render when the PainPoint#vote_state is up", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "up"});
  },
  
  "renders the up vote link as selected": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);
    value_of(output.find("a.up.selected")).should_not_be_empty();
    value_of(output.find("a.down.selected")).should_be_empty();
  }
});

PainPointsViewSpec.describe("#render when the PainPoint#vote_state is down", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "down"});
  },

  "renders the down vote link as selected": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);
    value_of(output.find("a.up.selected")).should_be_empty();
    value_of(output.find("a.down.selected")).should_not_be_empty();
  }
});

PainPointsViewSpec.describe("#up_vote.click", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "sends a POST to /pain_points/:pain_point_id/up_vote": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);

    output.find("a.up").click();
    value_of(ActiveAjaxRequests).should_have(1, 'length');
    var request = ActiveAjaxRequests[0];
    value_of(request.type).should_be('POST');
    value_of(request.url).should_be('/pain_points/1/up_vote');
  }
})

PainPointsViewSpec.describe("#down_vote.click", {
  "before each": function() {
    PainPointViewSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "sends a POST to /pain_points/:pain_point_id/down_vote": function() {
    var output = PainPointView.create(PainPointViewSpec.pain_point);

    output.find("a.down").click();
    value_of(ActiveAjaxRequests).should_have(1, 'length');
    var request = ActiveAjaxRequests[0];
    value_of(request.type).should_be('POST');
    value_of(request.url).should_be('/pain_points/1/down_vote');
  }
})