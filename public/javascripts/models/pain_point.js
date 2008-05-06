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
    var self = this;
    $.ajax({
      type: "POST",
      url: this.url() + "/up_vote",
      data: JSON.stringify({authenticity_token: window._token}),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        self.name = data.name;
        self.vote_state = data.vote_state;
        if(callback) {
          callback(self);
        }
      }
    });
  }

  PainPoint.prototype.down_vote = function(callback) {
    var self = this;
    $.ajax({
      type: "POST",
      url: this.url() + "/down_vote",
      data: JSON.stringify({authenticity_token: window._token}),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        self.name = data.name;
        self.vote_state = data.vote_state;
        if(callback) {
          callback(self);
        }
      }
    });
  }

  PainPoint.instances = [];
  PainPoint.sync = function(data) {
    for(var i=0; i < data.length; i++) {
      this.instances.push(new PainPoint(data[i]));
    }
  };
})(window);