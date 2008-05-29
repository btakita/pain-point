require("/specs/spec_helper");

Screw.Unit(function() {
  describe("LoginView", function() {
    describe('.create', function() {
      var view, success_callback, success_callback_called;

      before(function() {
        expect($('body > .login').length).to(equal, 0);
        expect($('body > .jqmOverlay').length).to(equal, 0);
        success_callback_called = false
        success_callback = function() {
          success_callback_called = true;
        }
        view = LoginView.create(success_callback);
      });

      it("attaches the login and overlay to the body", function() {
        expect($('body > .login').length).to(equal, 1);
        expect($('body > .jqmOverlay').length).to(equal, 1);
      });

      it("rendres a login and password text field and a submit button", function() {
        expect(view.login[0].tagName.toLowerCase()).to(equal, "input");
        expect(view.login.attr('type')).to(equal, "text");

        expect(view.password[0].tagName.toLowerCase()).to(equal, "input");
        expect(view.password.attr('type')).to(equal, "password");

        expect(view.submit[0].tagName.toLowerCase()).to(equal, "input");
        expect(view.submit.attr('type')).to(equal, "button");
      });

      describe('.login_button', function() {
        describe('.click', function() {
          before(function() {
            view.login.attr("value", "quentin");
            view.password.attr("value", "test");
          });

          this['sends a POST to /session with the text in username and password'] = function() {

            it('sends a POST to /session with the text in username and password', function() {
              view.submit.click();
              expect(ActiveAjaxRequests.length).to(equal, 1);
              var request = ActiveAjaxRequests.shift();
              expect(request.url).to(equal, "/session");
              expect(request.type).to(equal, "POST");
              expect(request.data).to(equal, {login: "quentin", password: "test"});
            });
          }

          describe("when the server responds with success", function() {
            this['sends a POST to /session with the text in username and password']();
            it("removes the overlay and login form from the body", function() {
              view.submit.click();
              ActiveAjaxRequests.shift().success();
              expect($('body > .login').length).to(equal, 0);
              expect($('body > .jqmOverlay').length).to(equal, 0);
            });

            it("invokes the passed in success callback", function() {
              view.submit.click();
              ActiveAjaxRequests.shift().success();
              expect(success_callback_called).to(equal, true);
            });
          });

          describe("when the server responds with failure", function() {
            it("renders 'login failed'", function() {
              expect(view.html()).to_not(match, "Login failed");
              view.submit.click();
              ActiveAjaxRequests.shift().error();
              expect(view.html()).to(match, "Login failed");
            });
          });

          });
      });
    });
  });
});
