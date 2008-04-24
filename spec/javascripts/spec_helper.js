require("/implementations/jquery-1.2.3");
require("/implementations/xmlbuilder");
require("/implementations/json2");
require("/implementations/models/pain_point");
require("/implementations/views/pain_point_view");
require("/implementations/views/pain_points_view");
// stylesheet('/stylesheets/your_css_file');
require("/specs/fake_jQuery_ajax");

Spec.reset = function() {
  document.getElementById('js_spec_content').innerHTML = "";
  ActiveAjaxRequests.length = 0;
  PainPoint.instances = [];
  delete window._token;
}
