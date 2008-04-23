require("/implementations/xmlbuilder");

var builder, content;
Spec.reset = function() {
  delete builder;
  delete content;
}
