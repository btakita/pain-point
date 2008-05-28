(function($) {
  window.LoginView = {
    'create': function(success_callback) {
      var builder = new XmlBuilder({binding: this});
      with(builder) {
        div({'class': "login jqmWindow"}, function() {
          h2("Login");
          div({'class': 'status'});
          div(function() {
            label("Login", {'for': 'login'});
            input({'type': 'text', id: 'login', 'class': 'login'});
          });
          div(function() {
            label("Password", {'for': 'password'});
            input({'type': 'password', id: 'password', 'class': 'password'});
          });
          div(function() {
            input({'type': 'button', 'class': 'submit', 'value': 'submit'});
          });
        });
      };
      var view = $(builder.toString());
      view.status = view.find('.status');
      view.login = view.find('input.login');
      view.password = view.find('input.password');
      view.submit = view.find('input.submit');
      view.submit.click(function() {
        $.ajax({
          url: '/session',
          type: 'POST',
          data: {
            login: view.login.attr('value'),
            password: view.password.attr('value')
          },
          success: function() {
            view.jqm().jqmHide();
            view.remove();
            success_callback();
          },
          error: function() {
            view.status.html("Login failed");
          }
        });
      });

      $('body').append(view);
      view.jqm().jqmShow();

      return view;
    }
  };
})(jQuery);