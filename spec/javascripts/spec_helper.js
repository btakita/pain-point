//require("/implementations/jquery-1.2.3");
require("/implementations/xmlbuilder");
require("/implementations/json2");
require("/implementations/models/pain_point");
require("/implementations/views/pain_point_view");
require("/implementations/views/pain_points_view");
require("/specs/fake_jQuery_ajax");
// stylesheet('/stylesheets/your_css_file');

Screw.Unit(function() {
  before(function() {
    $("#screw_unit_content").html("");
    ActiveAjaxRequests.length = 0;
    PainPoint.instances = [];
    delete window._token;
  });
});
