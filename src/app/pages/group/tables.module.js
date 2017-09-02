/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.group', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('group', {
          url: '/group',
          templateUrl: 'app/pages/group/basic/group.html',
          title: 'Groups',
          controller: 'GroupController',
          sidebarMeta: {
            icon: 'fa fa-group',
            order: 300
          },
        });
    $urlRouterProvider.when('/group','/group');
  }

})();
