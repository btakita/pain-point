//require("/implementations/jquery-1.2.3");
require("/implementations/xmlbuilder");
require("/implementations/json2");
require("/implementations/jqModal");
require("/implementations/models/pain_point");
require("/implementations/views/login_view");
require("/implementations/views/pain_point_view");
require("/implementations/views/pain_points_view");
require("/specs/fake_jQuery_ajax");
stylesheet('/stylesheets/application');
stylesheet('/stylesheets/jqModal');
stylesheet('/specs/less_annoying_overlay');

Screw.Unit(function() {
  after(function() {
    $("body > .jqmOverlay").remove();
    $("body > .login").remove();
    $("#screw_unit_content").html("");
    ActiveAjaxRequests.length = 0;
    PainPoint.instances = [];
    delete window._token;
  });
});
