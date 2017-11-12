/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.appointments', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('appointments', {
                url: '/appointments',
                templateUrl: 'app/pages/Appointments/basic/appointments.html',
                title: 'Appointments',
                controller: 'AppointmentsController as appointmentsCtrl',
                sidebarMeta: {
                    icon: 'fa fa-medkit',
                    order: 300
                },
            });
        $urlRouterProvider.when('/appointments', '/appointments');
    }

})();