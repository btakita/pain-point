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

PainPointSpec.describe("#url", {
  "before each": function() {
    PainPointSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "returns the url of the PainPoint (/pain_points/:pain_point_id)": function() {
    value_of(PainPointSpec.pain_point.url()).should_be("/pain_points/1");
  }
});

PainPointSpec.describe("#up_vote", {
  "before each": function() {
    PainPointSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "sends a POST to /pain_points/:pain_point_id/up_vote": function() {
    PainPointSpec.pain_point.up_vote();
    value_of(ActiveAjaxRequests).should_have(1, 'length');
    var request = ActiveAjaxRequests[0];
    value_of(request.type).should_be('POST');
    value_of(request.url).should_be('/pain_points/1/up_vote');
  },

  "sets PainPoint attributes to the data returned by the server": function() {
    value_of(PainPointSpec.pain_point.name).should_not_be('another name');
    value_of(PainPointSpec.pain_point.vote_state).should_be('neutral');
    PainPointSpec.pain_point.up_vote();
    ActiveAjaxRequests[0].success(JSON.stringify(
      {id: PainPointSpec.pain_point.id, name: 'another name', vote_state: 'up'}
    ));
    value_of(PainPointSpec.pain_point.name).should_be('another name');
    value_of(PainPointSpec.pain_point.vote_state).should_be('up');
  }
});

PainPointSpec.describe("#down_vote", {
  "before each": function() {
    PainPointSpec.pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral"});
  },

  "sends a POST to /pain_points/:pain_point_id/down_vote": function() {
    PainPointSpec.pain_point.down_vote();
    value_of(ActiveAjaxRequests).should_have(1, 'length');
    var request = ActiveAjaxRequests[0];
    value_of(request.type).should_be('POST');
    value_of(request.url).should_be('/pain_points/1/down_vote');
  },

  "sets PainPoint attributes to the data returned by the server": function() {
    value_of(PainPointSpec.pain_point.name).should_not_be('another name');
    value_of(PainPointSpec.pain_point.vote_state).should_be('neutral');
    PainPointSpec.pain_point.down_vote();
    ActiveAjaxRequests[0].success(JSON.stringify(
      {id: PainPointSpec.pain_point.id, name: 'another name', vote_state: 'down'}
    ));
    value_of(PainPointSpec.pain_point.name).should_be('another name');
    value_of(PainPointSpec.pain_point.vote_state).should_be('down');
  }
});