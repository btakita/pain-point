(function($) {
  window.LoginView = {
    'create': function() {
      var builder = new XmlBuilder({binding: this});
      with(builder) {
        div({'class': "login jqmWindow"}, function() {
          h2("Login");
          div(function() {
            label("Login", {'for': 'login'});
            input({'type': 'text', id: 'login', 'class': 'login'});
          });
          div(function() {
            label("Password", {'for': 'password'});
            input({'type': 'text', id: 'password', 'class': 'password'});
          });
          div(function() {
            input({'type': 'button', 'class': 'submit', 'value': 'submit'});
          });
        });
      };
      var view = $(builder.toString());
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
          }
        });
      });

      $('body').append(view);
      view.jqm().jqmShow();

      return view;
    }
  };
})(jQuery);