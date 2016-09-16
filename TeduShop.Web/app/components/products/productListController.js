(function (app) {
    app.controller('productListController', productListController);

    productListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];
    function productListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.products = [];//khai bao mang rong
        $scope.page = 0;//goi phan trang
        $scope.pagesCount = 0;
        $scope.getProducts = getProducts;
        $scope.keyword = '';

        //Binding cho su kien push len khi search
        $scope.search = search;

        $scope.deleteProduct = deleteProduct;

        $scope.selectAll = selectAll; //su kien cho selectAll
        $scope.isAll = false;

        $scope.deleteMultiple = deleteMultiple;//su kien cho Delete All

        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            });
            var config = {
                params: {
                    checkProducts: JSON.stringify(listId)
                }
            }
            apiService.del('api/product/deletemulti', config, function (result) {
                notificationService.displaySuccess('Deleted ' + result.data + ' item(s) successfully.');
                search();
            }, function (error) {
                notificationService.displayError('Remove unsuccessfully.');
            });
        }

        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.products, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.products, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }
        $scope.$watch("products", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $('#btnDelete').removeAttr('disabled');
            } else {
                $('#btnDelete').attr('disabled', 'disabled');
            }
        }, true);

        function deleteProduct(id) {
            $ngBootbox.confirm('Are you sure?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/product/delete', config, function () {
                    notificationService.displaySuccess('Deleted successfully');
                    search();
                }, function () {
                    notificationService.displayError('Remove items unsuccessfully.');
                })
            });
        }

        function search() {
            getProducts();
        }

        function getProducts(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 20
                }
            }
            apiService.get('/api/product/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('Not found any record.');
                }
                $scope.products = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;//nho dung ten thuoc tinh cua no
                $scope.totalCount = result.data.TotalCount;
            }, function () {//failure
                console.log('Load Products failed.');
            });
        }

        $scope.getProducts();

    }
})(angular.module('tedushop.products'));