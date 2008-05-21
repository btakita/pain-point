class FitCleanupDb < Fit::Fixture
  def initialize

    super
    User.find(:all).each do |user|
      user.destroy
    end
  end
end
