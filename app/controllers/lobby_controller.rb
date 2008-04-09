class LobbyController < ApplicationController
  def show
    render :template => 'lobby/show.rb'
#    render_widget Views::Lobby::Show
  end
end
