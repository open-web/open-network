/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.user', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/pages/user/basic/user.html',
                title: 'Users',
                controller: 'UserController as userCtrl',
                sidebarMeta: {
                    icon: 'fa fa-user',
                    order: 300
                },
            });
        $urlRouterProvider.when('/user', '/user');
    }

})();