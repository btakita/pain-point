require("/implementations/jquery/jquery-1.2.3");
require("/implementations/models/pain_point");
require("/implementations/views/pain_points_view");
// stylesheet('/stylesheets/your_css_file');

Spec.reset = function() {
  document.getElementById('js_spec_content').innerHTML = "";
}
