(function(window) {
  window.PainPoint = function PainPoint(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.vote_state = attributes.vote_state;
  };
  
  PainPoint.prototype.url = function() {
    return "/pain_points/" + this.id;
  }

  PainPoint.prototype.up_vote = function(callback) {
    $.post(this.url() + "/up_vote", {}, function(response) {
      var data = JSON.parse(response);
      callback(data);
    });
  }

  PainPoint.prototype.down_vote = function(callback) {
    $.post(this.url() + "/down_vote", {}, function(response) {
      var data = JSON.parse(response);
      callback(data);
    });
  }

  PainPoint.instances = [];
  PainPoint.sync = function(data) {
    for(var i=0; i < data.length; i++) {
      this.instances.push(new PainPoint(data[i]));
    }
  };
})(this);