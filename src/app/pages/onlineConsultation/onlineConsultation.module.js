/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.onlineConsultation', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('onlineConsultation', {
                url: '/onlineConsultation',
                templateUrl: 'app/pages/onlineConsultation/basic/onlineConsultation.html',
                title: 'Online Consultation',
                controller: 'OnlineConsultationController as onlineConsultCtrl',
                sidebarMeta: {
                    icon: 'fa fa-stethoscope',
                    order: 300
                },
            });
        $urlRouterProvider.when('/onlineConsultation', '/onlineConsultation');
    }

})();