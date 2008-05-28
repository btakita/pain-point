require("/specs/fake_jquery_ajax");
require("/implementations/models/pain_point");
require("/implementations/views/pain_points_view");
// stylesheet('/stylesheets/your_css_file');

Spec.reset = function() {
  document.getElementById('js_spec_content').innerHTML = "";
}
