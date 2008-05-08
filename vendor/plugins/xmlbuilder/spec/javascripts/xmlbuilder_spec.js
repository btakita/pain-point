require('/specs/spec_helper');

Screw.Unit(function() {
  describe("Xmlbuilder", function() {
    var content, builder;
    before(function() {
      content = $('#screw_unit_content');
      content.html("");
      builder = new XmlBuilder();
    });

    describe("#tag", function() {
      describe("with one argument", function() {
        it('renders an empty tag', function() {
          builder.tag("div");
          expect(builder.toString().toLowerCase()).to(equal, "<div></div>");
        });
      });

      describe("with two arguments", function() {
        it('supports css classes', function() {
          builder.tag("div", {"class": "foo bar"});

          expect(builder.toString().toLowerCase()).to(equal, '<div class="foo bar"></div>');
          var element = $(builder.toString());
          expect(element.hasClass("foo")).to(equal, true);
          expect(element.hasClass("bar")).to(equal, true);
        });

        it('supports styles', function() {
          builder.tag("div", {"style": "display: none; color: white; float: left;"});

          expect(builder.toString().toLowerCase()).to(equal, '<div style="display: none; color: white; float: left;"></div>');
          var element = $(builder.toString());
          expect(element.css('display')).to(equal, "none");
          expect(element.css('color')).to(equal, "white");
          expect(element.css('float')).to(equal, "left");
        });

        it('passes builder as an argument into inner Tag Function', function() {
          var innerFunctionCalled = false;
          builder.tag("div", function(b) {
            innerFunctionCalled = true;
            if(builder != b) {
              throw "The builder should be passed into the function.";
            }
          });
          expect(innerFunctionCalled).to(equal, true);
        });

        it('renders the inner content of the tag', function() {
          builder.tag("div", function(b) {
            builder.tag("span");
          });
          expect(builder.toString().toLowerCase()).to(equal, "<div><span></span></div>");
        });

        describe("when passed tag name and text", function() {
          it('renders the text inside of the tag', function() {
            builder.tag("div", "test text");
            expect(builder.toString().toLowerCase()).to(equal, "<div>test text</div>");
          });
        })
      });

      describe("with three arguments", function() {
        it('renders passed in attributes and inner content', function() {
          builder.tag("div", {a: "b"}, function(b) {
            builder.tag("span", {c: "d"}, "test text");
            builder.tag("foobar");
          });
          expect(builder.toString().toLowerCase()).to(equal, "<div a=\"b\"><span c=\"d\">test text</span><foobar></foobar></div>");
        });

        it('renders passed in attributes and inner text', function() {
          var expectedText = "test text";
          builder.tag("div", "test text", {style: "display: none;"});
          expect(builder.toString().toLowerCase()).to(equal, "<div style=\"display: none;\">test text</div>");
        });

        it('handles null third argument', function() {
          builder.tag("div", {a: "b"}, null);
          expect(builder.toString().toLowerCase()).to(equal, "<div a=\"b\"></div>");
        });
      });

      describe("with more than three arguments", function() {
        it("raises an error", function() {
          var error_thrown = false;
          try {
            builder.tag(1,2,3,4);
          }
          catch(error) {
            error_thrown = true;
          }
          expect(error_thrown).to(equal, true);
        });
      });

      describe("with binding of the inner function", function() {
        it('defaults to the builder', function() {
          builder.expectedText = "test text";
          builder.tag("div", function(b) {
            builder.tag("span", this.expectedText);
          });
          expect(builder.toString().toLowerCase()).to(equal, "<div><span>" + builder.expectedText + "</span></div>");
        });

        describe("when set to another object's binding", function() {
          it("uses the binding of the other object", function() {
            var obj = {expectedText: "test text"};

            builder.binding = obj;
            builder.tag("div", function(b) {
              builder.tag("span", this.expectedText);
            });
            expect(builder.toString().toLowerCase()).to(equal, "<div><span>" + obj.expectedText + "</span></div>");
          });
        });

        describe("when set to another object's binding in initialization", function() {
          it("uses the binding of the other object", function() {
            var obj = {expectedText: "test text"};

            var builder = new XmlBuilder({binding: obj});
            builder.tag("div", function(b) {
              builder.tag("span", this.expectedText);
            });
            expect(builder.toString().toLowerCase()).to(equal, "<div><span>" + obj.expectedText + "</span></div>");
          });
        });

      });
    });

    describe("#textNode", function() {
      it("html escapes the passed in text", function() {
        var appendText = "appended <blah> text"
        var expectedText = "appended &lt;blah&gt; text"
        builder.tag("div", function() {
          builder.textNode(appendText);
        });
        expect(builder.toString().toLowerCase()).to(equal, "<div>" + expectedText + "</div>");
      });
    });

    describe("#text", function() {
      it("does not html escape the passed in text", function() {
        builder.tag("div", function() {
          builder.text("<xml><foo></foo></xml>");
        });
        expect(builder.toString().toLowerCase()).to(equal, "<div><xml><foo></foo></xml></div>");
      });
    });

    describe("#div", function() {
      it("renders a div tag", function() {
        builder.div("content", {id: 'test id'});
        expect(builder.toString().toLowerCase()).to(equal, '<div id="test id">content</div>');
      });

      it("when using a custom binding, renders a div tag with custom binding", function() {
        var theBinding = {foo: 'bar'};
        builder.binding = theBinding;
        builder.div({id: 'test id'}, function() {
          builder.text(this.foo);
        });
        expect(builder.toString().toLowerCase()).to(equal, '<div id="test id">bar</div>');
      });
    });
  });
});
