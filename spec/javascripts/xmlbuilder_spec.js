require('/specs/spec_helper');

function XmlbuilderSpec() {}
Spec.register(XmlbuilderSpec);

XmlbuilderSpec['before each'] = function() {
  content = document.getElementById('js_spec_content');
  content.innerHTML = "";
  builder = new XmlBuilder();
}

XmlbuilderSpec.describe("#tag with one argument", {
  'renders an empty tag': function() {
    builder.tag("div");
    value_of(builder.toString().toLowerCase()).should_be("<div></div>");
  }
});

XmlbuilderSpec.describe("#tag with two arguments", {
  'supports css classes': function() {
    builder.tag("div", {"class": "foo bar"});

    value_of(builder.toString().toLowerCase()).should_be('<div class="foo bar"></div>');
    content.innerHTML = builder.toString();
    value_of(content.childNodes[0].className).should_be("foo bar");
  },

  'supports styles': function() {
    builder.tag("div", {"style": "display: none; color: white; float: left;"});

    value_of(builder.toString().toLowerCase()).should_be('<div style="display: none; color: white; float: left;"></div>');
    content.innerHTML = builder.toString();
    var element = content.childNodes[0];
    value_of(element.style.display).should_be("none");
    value_of(element.style.color).should_be("white");
    var floatValue = element.style.cssFloat || element.style.styleFloat;
    value_of(floatValue).should_be("left");
  },

  'it passes builder as an argument into inner Tag Function': function() {
    var innerFunctionCalled = false;
    builder.tag("div", function(b) {
      innerFunctionCalled = true;
      if(builder != b) {
        throw "The builder should be passed into the function.";
      }
    });
    value_of(innerFunctionCalled).should_be(true);
  },

  'renders the inner content of the tag': function() {
    builder.tag("div", function(b) {
      builder.tag("span");
    });
    value_of(builder.toString().toLowerCase()).should_be("<div><span></span></div>");
  },

  'when passed tag name and text, it renders the text inside of the tag': function() {
    builder.tag("div", "test text");
    value_of(builder.toString().toLowerCase(), "<div>test text</div>");
  }
});


XmlbuilderSpec.describe("#tag with three arguments", {
  'it renders passed in attributes and inner content': function() {
    var expectedText = "test text"
    builder.tag("div", {a: "b"}, function(b) {
      builder.tag("span", {c: "d"}, "test text");
      builder.tag("foobar");
    });
    value_of(builder.toString().toLowerCase()).should_be("<div a=\"b\"><span c=\"d\">test text</span><foobar></foobar></div>");
  },

  'it renders passed in attributes and inner text': function() {
    var expectedText = "test text";
    builder.tag("div", "test text", {style: "display: none;"});
    value_of(builder.toString().toLowerCase()).should_be("<div style=\"display: none;\">test text</div>");
  },

  'handles null third argument': function() {
    builder.tag("div", {a: "b"}, null);
    value_of(builder.toString().toLowerCase()).should_be("<div a=\"b\"></div>");
  }
});

XmlbuilderSpec.describe("#tag with more then three arguments", {
  "raises an error": function() {
    var error_thrown = false;
    try {
      builder.tag(1,2,3,4);
    }
    catch(error) {
      error_thrown = true;
    }
    value_of(error_thrown).should_be(true);    
  }
});

XmlbuilderSpec.describe("#tag with binding of the inner function", {
  'defaults to the builder': function() {
    builder.expectedText = "test text";
    builder.tag("div", function(b) {
      builder.tag("span", this.expectedText);
    });
    value_of(builder.toString().toLowerCase()).should_be("<div><span>" + builder.expectedText + "</span></div>");
  },

  "when set to another object's binding, uses the binding of the other object": function() {
    var obj = {expectedText: "test text"};

    builder.binding = obj;
    builder.tag("div", function(b) {
      builder.tag("span", this.expectedText);
    });
    value_of(builder.toString().toLowerCase()).should_be("<div><span>" + obj.expectedText + "</span></div>");
  },

  "when set to another object's binding in initialization, uses the binding of the other object": function() {
    var obj = {expectedText: "test text"};

    var builder = new XmlBuilder({binding: obj});
    builder.tag("div", function(b) {
      builder.tag("span", this.expectedText);
    });
    value_of(builder.toString().toLowerCase()).should_be("<div><span>" + obj.expectedText + "</span></div>");
  }
});

XmlbuilderSpec.describe("#textNode", {
  "html escapes the passed in text": function() {
    var appendText = "appended <blah> text"
    var expectedText = "appended &lt;blah&gt; text"
    builder.tag("div", function() {
      builder.textNode(appendText);
    });
    value_of(builder.toString().toLowerCase()).should_be("<div>" + expectedText + "</div>");
  }
});

XmlbuilderSpec.describe("#text", {
  "does not html escape the passed in text": function() {
    builder.tag("div", function() {
      builder.text("<xml><foo></foo></xml>");
    });
    value_of(builder.toString().toLowerCase()).should_be("<div><xml><foo></foo></xml></div>");
  }
});

XmlbuilderSpec.describe("#div", {
  "renders a div tag": function() {
    builder.div("content", {id: 'test id'});
    value_of(builder.toString().toLowerCase()).should_be('<div id="test id">content</div>');
  },

  "when using a custom binding, renders a div tag with custom binding": function() {
    var theBinding = {foo: 'bar'};
    builder.binding = theBinding;
    builder.div({id: 'test id'}, function() {
      builder.text(this.foo);
    });
    value_of(builder.toString().toLowerCase()).should_be('<div id="test id">bar</div>');
  }
});
