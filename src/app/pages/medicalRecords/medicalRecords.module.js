/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.medicalRecords', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('medicalRecords', {
                url: '/medicalRecords',
                templateUrl: 'app/pages/medicalRecords/basic/medicalRecords.html',
                title: 'Medical Records',
                controller: 'MedicalRecords as medRecCtrl',
                sidebarMeta: {
                    icon: 'fa fa-heartbeat',
                    order: 300
                },
            });
        $urlRouterProvider.when('/medicalRecords', '/medicalRecords');
    }

})();