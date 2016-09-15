(function (app) {
    app.filter('statusFilter', function () {
        return function (input) {
            if (input == true)
                return 'Actived';
            else
                return 'Deactivated';
        }
    });
})(angular.module('tedushop.common'));