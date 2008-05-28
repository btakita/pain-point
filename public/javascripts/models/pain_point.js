(function() {
  var update_attributes, vote;
  window.PainPoint = function PainPoint(attributes) {
    update_attributes.call(this, attributes);
    this.location = window.location;
  };

  PainPoint.prototype.url = function() {
    return "/pain_points/" + this.id;
  }

  PainPoint.prototype.up_vote = function(callback) {
    vote.call(this, "up_vote", callback);
  }

  PainPoint.prototype.down_vote = function(callback) {
    vote.call(this, "down_vote", callback);
  }

  PainPoint.instances = [];
  PainPoint.sync = function(data) {
    for(var i=0; i < data.length; i++) {
      this.instances.push(new PainPoint(data[i].attributes));
    }
  };

  update_attributes = function(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.vote_state = attributes.vote_state;
    this.score = attributes.score;
  }

  vote = function(direction, callback) {
    var self = this;
    $.ajax({
      type: "POST",
      url: self.url() + "/" + direction,
      data: JSON.stringify({authenticity_token: window._token}),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        if(data.type == "Login") {
          if(callback) callback(data);
        } else {
          update_attributes.call(self, data.attributes);
          if(callback) callback(self);
        }
      }
    });
  }
})();