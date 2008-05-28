require("/specs/spec_helper");

Screw.Unit(function() {
  describe("PainPointView", function() {
    var pain_point;
    describe("#render", function() {
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 55});
      })

      it("renders a li element with an up vote, down vote, and an edit link", function() {
        var view = PainPointView.create(pain_point);
        expect(view.find("a.up")).to_not(be_empty);
        expect(view.find("a.down")).to_not(be_empty);
        expect(view.find("a[@href='/pain_points/1/edit']")).to_not(be_empty);
      });

      describe("PainPoint#score", function() {
        it("renders the score", function() {
          var view = PainPointView.create(pain_point);
          expect(view.html()).to(match, pain_point.score.toString());
        });
      });

      describe("PainPoint#vote_state", function() {
        describe("when neutral", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
          });

          it("renders neither the up vote or down vote link as selected", function() {
            var view = PainPointView.create(pain_point);
            expect(view.find("a.up.selected")).to(be_empty);
            expect(view.find("a.down.selected")).to(be_empty);
          });
        });

        describe("when up", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "up", score: 1});
          });

          it("renders the up vote link as selected", function() {
            var view = PainPointView.create(pain_point);
            expect(view.find("a.up.selected")).to_not(be_empty);
            expect(view.find("a.down.selected")).to(be_empty);
          });
        });

        describe("when down", function() {
          before(function() {
            pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "down", score: -1});
          });

          it("renders the down vote link as selected", function() {
            var view = PainPointView.create(pain_point);
            expect(view.find("a.up.selected")).to(be_empty);
            expect(view.find("a.down.selected")).to_not(be_empty);
          });
        });
      });

    });

    describe("#refresh", function() {
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
        view = PainPointView.create(pain_point);
      });
      
      describe("PainPoint#score > 0", function() {
        it("renders the score", function() {
          pain_point.score = 1;
          view.refresh(pain_point);
          expect(view.find(".score").html()).to(equal, "1");
        })
      });

      describe("PainPoint#score == 0", function() {
        it("renders the score", function() {
          pain_point.score = 0;
          view.refresh(pain_point);
          expect(view.find(".score").html()).to(equal, "0");
        })
      });

      describe("PainPoint#score < 0", function() {
        it("renders the score", function() {
          pain_point.score = -1;
          view.refresh(pain_point);
          expect(view.find(".score").html()).to(equal, "-1");
        })
      });
    });

    describe("#up_vote.click", function() {
      var view, link;
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
        view = PainPointView.create(pain_point);
        link = view.find("a.up");
      });

      it("sends a POST to /pain_points/:pain_point_id/up_vote", function() {
        link.click();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(request.url).to(equal, '/pain_points/1/up_vote');
      });

      describe("when the server responds with a Login", function() {
        before(function() {
          expect(view.login).to(equal, undefined);
          expect($('body > .login').length).to(equal, 0);
          link.click();
          ActiveAjaxRequests.shift().success({'type': "Login"});
        });

        it("creates a LoginView", function() {
          expect(view.login).to_not(equal, undefined);
          expect(view.login.hasClass('login')).to(equal, true);
          expect($('body > .login').length).to(equal, 1);
        });
      });

      describe("when the server responds with a PainPoint", function() {
        describe("PainPoint#vote_state", function() {
          describe("up", function() {
            it("adds the 'selected' up vote link css class and removes 'selected' from the down vote link css class", function() {
              view.find("a.down").addClass("selected");
              expect(view.find("a.up.selected")).to(be_empty);
              expect(view.find("a.down.selected")).to_not(be_empty);
              link.click();
              ActiveAjaxRequests[0].success(
                {
                  'type': "PainPoint",
                  'attributes': {id: 1, name: "Pain Point 1", vote_state: "up", score: 0}
                }
              );

              expect(view.find("a.up.selected")).to_not(be_empty);
              expect(view.find("a.down.selected")).to(be_empty);
            });
          });

          describe("neutral", function() {
            it("removes the 'selected' up vote link and down vote link css classes", function() {
              view.find("a.up").addClass("selected");
              expect(view.find("a.up.selected")).to_not(be_empty);
              view.find("a.down").addClass("selected");
              expect(view.find("a.down.selected")).to_not(be_empty);

              link.click();
              ActiveAjaxRequests[0].success(
                {
                  'type': "PainPoint",
                  'attributes': {id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0}
                }
              );

              expect(view.find("a.up.selected")).to(be_empty);
              expect(view.find("a.down.selected")).to(be_empty);
            });
          });
        });

        describe("PainPoint#score", function() {
          it("renders the updated score", function() {
            expect(view.find(".score").html()).to_not(equal, "5");

            link.click();
            ActiveAjaxRequests[0].success(
              {
                'type': "PainPoint",
                'attributes': {id: 1, name: "Pain Point 1", vote_state: "up", score: 5}
              }
            );

            expect(view.find(".score").html()).to(equal, "5");
          })
        });
      });

    })

    describe("#down_vote.click", function() {
      var view, link;
      before(function() {
        pain_point = new PainPoint({id: 1, name: "Pain Point 1", vote_state: "neutral", score: 0});
        view = PainPointView.create(pain_point);
        link = view.find("a.down");
      });

      it("sends a POST to /pain_points/:pain_point_id/down_vote", function() {
        link.click();
        expect(ActiveAjaxRequests.length).to(equal, 1);
        var request = ActiveAjaxRequests[0];
        expect(request.type).to(equal, 'POST');
        expect(request.url).to(equal, '/pain_points/1/down_vote');
      });

      describe("when the server responds with a Login", function() {
        before(function() {
          expect(view.login).to(equal, undefined);
          expect($('body > .login').length).to(equal, 0);
          link.click();
          ActiveAjaxRequests.shift().success({'type': "Login"});
        });

        it("creates a LoginView", function() {
          expect(view.login).to_not(equal, undefined);
          expect(view.login.hasClass('login')).to(equal, true);
          expect($('body > .login').length).to(equal, 1);
        });
      });

      describe("processing the server response", function() {
        describe("PainPoint#vote_state", function() {
          describe("down", function() {
            it("adds the 'selected' down vote link css class and removes the 'selected' up vote link css class", function() {
              view.find("a.up").addClass('selected');
              expect(view.find("a.up.selected")).to_not(be_empty);
              expect(view.find("a.down.selected")).to(be_empty);
              link.click();
              ActiveAjaxRequests[0].success(
                {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "down", score: 1}}
              );

              expect(view.find("a.up.selected")).to(be_empty);
              expect(view.find("a.down.selected")).to_not(be_empty);
            });
          });

          describe("neutral", function() {
            it("removes the 'selected' down vote and up vote link css class", function() {
              view.find("a.up").addClass("selected");
              link.addClass("selected");
              expect(view.find("a.up.selected")).to_not(be_empty);
              expect(view.find("a.down.selected")).to_not(be_empty);
              link.click();
              ActiveAjaxRequests[0].success(
                {'type': "PainPoint", 'attributes': {id: 1, name: "Pain Point 1", vote_state: "neutral", score: 3}}
              );

              expect(view.find("a.up.selected")).to(be_empty);
              expect(view.find("a.down.selected")).to(be_empty);
            });
          });
        });

        describe("PainPoint#score", function() {
          it("renders the updated score", function() {
            expect(view.find(".score").html()).to_not(equal, "-5");

            link.click();
            ActiveAjaxRequests[0].success(
              {
                'type': "PainPoint",
                'attributes': {id: 1, name: "Pain Point 1", vote_state: "neutral", score: -5}
              }
            );

            expect(view.find(".score").html()).to(equal, "-5");
          })
        });
      });
    });
  });
});
