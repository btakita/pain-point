ActionController::Routing::Routes.draw do |map|
  map.resources :pain_points do |pain_points|
    pain_points.resources :up_vote, :controller => "vote_submissions/up_vote_submissions"
    pain_points.resources :down_vote, :controller => "vote_submissions/down_vote_submissions"
  end
  map.resource :session
  map.resources :users

  map.lobby '/', :controller => 'lobby', :action => 'show'
  map.activate '/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
end
