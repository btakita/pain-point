class FitCreateUser < Fit::ColumnFixture

  attr_writer :name

  def reset
    @name = nil
  end

  def execute
    @user = User.create(
      :login => @name,
      :email => "#{@name}@example.com",
      :password => "pass",
      :password_confirmation => "pass"
    )
  end

  def results
    @user.valid?? true : @user.errors.full_messages.join(", ")
  end

end
