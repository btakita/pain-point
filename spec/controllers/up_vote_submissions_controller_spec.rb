require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

module VoteSubmissions
  describe UpVoteSubmissionsController do
    attr_reader :user

    before do
      @user = users(:quentin)
    end

    describe "POST create" do
      attr_reader :pain_point
      before do
        @pain_point = pain_points(:software_complexity)
        user.votes.pain_points.should_not include(pain_point)
      end

      should_require_login do
        post :create, :pain_point_id => pain_point.id
      end

      describe "when logged in" do
        before do
          login_as :quentin
        end

        describe "and the User does not have a Vote for the PainPoint" do
          it "responds with nothing" do
            post :create, :pain_point_id => pain_point.id
            response.should be_success
            response.body.should be_blank
          end
          
          describe "and passed valid data" do
            it "creates a Vote" do
              post :create, :pain_point_id => pain_point.id
              user.reload
              user.votes.pain_points.should include(pain_point)
            end
          end

          describe "and passed invalid data" do
            before do
              vote = nil
              stub.proxy(Vote).new do |new_vote|
                vote = new_vote
                stub.proxy(vote).valid? {false}
                vote
              end
            end

            # Notice there is duplication in the "does not create a Vote" and "responds with an error" Examples
            it "does not create a Vote" do
              lambda do
                lambda do
                  post :create, :pain_point_id => pain_point.id
                end.should raise_error
              end.should_not change {Vote.count}
            end

            it "responds with an error" do
              lambda do
                post :create, :pain_point_id => pain_point.id
              end.should raise_error
            end
          end
        end
      end
    end
  end  
end
