/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.user')
        .controller('UserController', UserController)
        .controller('ModalsPageCtrl', ModalsPageCtrl);

    /** @ngInject */
    function UserController($scope, $filter, editableOptions, editableThemes, $uibModal, $http) {

        $scope.smartTablePageSize = 10;
        var vm = this;
        $http.get('http://localhost:81/allusers').then(
            function(response) {
                vm.status = response.status;
                $scope.smartTableData = response.data.users;
                vm.total = response.data.total_user;
            },
            function(exp) {
                console.log(exp);
            })

        $scope.showForm = function() {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: 'modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function() {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.showGroup = function(user) {
            if (user.group && $scope.groups.length) {
                var selected = $filter('filter')($scope.groups, { id: user.group });
                return selected.length ? selected[0].text : 'Not set';
            } else return 'Not set'
        };

        $scope.showStatus = function(user) {
            var selected = [];
            if (user.status) {
                selected = $filter('filter')($scope.statuses, { value: user.status });
            }
            return selected.length ? selected[0].text : 'Not set';
        };


        $scope.removeUser = function(index) {
            $scope.users.splice(index, 1);
        };

        $scope.addUser = function() {
            $scope.inserted = {
                id: $scope.users.length + 1,
                name: '',
                status: null,
                group: null
            };
            $scope.users.push($scope.inserted);
        };

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';



        /*Create New User START*/
        $scope.AddUser = function(page, size) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'adduser.html',
                size: size,
                scope: $scope,
                resolve: {
                    items: function() {
                        console.log("a");
                        return $scope.items;
                    }
                }
            });
        };


        vm.addNewUser = addNewUser;
        vm.addUserDetails = {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            age: "",
            password: "",
            gender: "",
            status: "",
            role_id: ""
        }
        vm.roleArray = [{
                id: 1,
                name: "Admin"
            },
            {
                id: 2,
                name: "Doctor"
            },
            {
                id: 3,
                name: "Patient"
            }
        ];

        function addNewUser() {
            console.log("NewUserDetails", vm.addUserDetails);
            $http.post('http://localhost:81/user', vm.addUserDetails).then(
                function(response) {
                    vm.status = response.status;
                    vm.createResponse = response.data.user_created;
                    $scope.smartTableData.unshift(vm.createResponse);
                    vm.total = response.data.total_user;
                },
                function(exp) {
                    console.log(exp);
                })
            $scope.modalInstance.close('close');
        }

        /*Create New User END*/

        /*EDIT User START*/
        vm.updateUser = updateUser;
        vm.editUserDetails = {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            age: "",
            password: "",
            gender: "",
            status: "",
            role_id: "",
            id: ""
        }
        $scope.editUser = function(id, size) {

            $http.get('http://localhost:81/allusers?id=' + id).then(
                function(response) {
                    vm.status = response.status;
                    vm.editUserDetails = response.data.users[0];
                    vm.editUserDetails.id = id;
                    vm.total = response.data.total_user;
                },
                function(exp) {
                    console.log(exp);
                })
            $scope.modalInstanceEdit = $uibModal.open({
                animation: true,
                templateUrl: 'edituser.html',
                size: size,
                scope: $scope,
                resolve: {
                    items: function() {
                        console.log("a");
                        return $scope.items;
                    }
                }
            });
        };

        function updateUser() {
            $http.put('http://localhost:81/user/' + vm.editUserDetails.id, vm.editUserDetails).then(
                function(response) {
                    vm.status = response.status;
                    vm.createResponse = response.data.user_created;
                    $scope.smartTableData.unshift(vm.createResponse);
                    vm.total = response.data.total_user;
                },
                function(exp) {
                    console.log(exp);
                })
            $scope.modalInstance.close('close');
        }
        /*EDIT User END*/

    }

    function ModalsPageCtrl($scope, $uibModal, baProgressModal) {
        $scope.open = function(page, size) {
            console.log("a");
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };
        $scope.openProgressDialog = baProgressModal.open;
    }

})();