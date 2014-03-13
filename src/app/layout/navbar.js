'use strict';

angular.module('app').controller('NavbarController', function ($scope, $api, $modal) {
  $scope.$watch('current_person', function(current_person) {
    if (current_person) {
      $api.person_teams(current_person.id).then(function(teams) {
        $scope.teams = teams;
      });
    }
  });

  $scope.setEnv = $api.setEnvironment;

  $scope.set_access_token = {
    show_modal: false,
    new_token: $api.get_access_token(),
    open: function() { this.show_modal = true; },
    close: function() { this.show_modal = false; },
    save: function() {
      $api.set_access_token(this.new_token);
      $api.load_current_person_from_cookies();
      this.close();
    }
  };

  $scope.signout = function() {
    $api.signout();
  };
});

angular.module('app').controller('AlertNotificationBar', function ($scope, $location) {
  $scope.$on('$routeChangeSuccess', function() {
    $scope.show_alert_notification_bar = !$location.path().match(/^(\/|\/fundraisers\/.*)$/);
  });
});

angular.module('app').controller('NavbarLinkedAccountSignin', function($scope, $location, $api) {
  $scope.save_route = function() {
    $api.set_post_auth_url($location.url());
  };

  $scope.send_to_email_login = function() {
    $scope.save_route();
    $location.url("/signin");
  };
});