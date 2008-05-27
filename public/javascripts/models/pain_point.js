(function() {
  window.PainPoint = function PainPoint(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.vote_state = attributes.vote_state;
  };

  PainPoint.instances = [];
  PainPoint.sync = function(data) {
    for(var i=0; i < data.length; i++) {
      this.instances.push(new PainPoint(data[i]));
    }
  };
})();