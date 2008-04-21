require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

module VoteSubmissions
  describe DownVoteSubmissionsController do
    attr_reader :user

    before do
      @user = users(:quentin)
    end

    describe "POST create" do
      attr_reader :pain_point

      should_require_login do
        post :create, :pain_point_id => pain_points(:software_complexity).id
      end

      describe "when logged in" do
        before do
          login_as :quentin
        end

        describe "and passed invalid data" do
          # Notice there is duplication in the "does not create a Vote" and "responds with an error" Examples
          it "does not create a Vote" do
            lambda do
              lambda do
                post :create, :pain_point_id => nil
              end.should raise_error
            end.should_not change {Vote.count}
          end

          it "responds with an error" do
            lambda do
              post :create, :pain_point_id => nil
            end.should raise_error
          end
        end

        describe "and passed valid data" do
          describe "and the User does not have a Vote for the PainPoint" do
            before do
              @pain_point = pain_points(:software_complexity)
              user.votes.pain_points.should_not include(pain_point)
            end

            it "creates a Vote" do
              post :create, :pain_point_id => pain_point.id
              user.reload
              user.votes.pain_points.should include(pain_point)
            end

            it "responds with nothing" do
              post :create, :pain_point_id => pain_point.id
              response.should be_success
              response.body.should be_blank
            end
          end

          describe "and the User has a Vote for the PainPoint" do
            attr_reader :existing_vote
            before do
              stub.proxy(controller).current_user do
                user
              end
              @pain_point = pain_points(:slow_tests)
              user.votes.pain_points.should include(pain_point)
              @existing_vote = user.votes.find_by_pain_point_id(pain_point.id)
              mock.proxy(user.votes).find_or_create_by_pain_point_id(pain_point.to_param) do
                existing_vote
              end
              existing_vote.state.should == 'neutral'
            end

            it "does not create a new Vote" do
              lambda do
                post :create, :pain_point_id => pain_point.id
              end.should_not change {Vote.count}
            end

            it "sends an down_vote event to the existing Vote" do
              mock.proxy(existing_vote).down_vote
              post :create, :pain_point_id => pain_point.id
              existing_vote.reload.state.should == 'down'
            end

            it "responds with nothing" do
              post :create, :pain_point_id => pain_point.id
              response.should be_success
              response.body.should be_blank
            end
          end
        end
      end
    end
  end  
end
