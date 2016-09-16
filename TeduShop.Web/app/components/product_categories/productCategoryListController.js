(function (app) {
    app.controller('productCategoryListController', productCategoryListController);
    
    productCategoryListController.$inject = ['$scope','apiService','notificationService','$ngBootbox'];
    function productCategoryListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.productCategories = [];//khai bao mang rong
        $scope.page = 0;//goi phan trang
        $scope.pagesCount = 0;
        $scope.getProductCategories = getProductCategories;
        $scope.keyword = '';

        //Binding cho su kien push len khi search
        $scope.search = search;

        $scope.deleteProductCategory = deleteProductCategory;

        function deleteProductCategory(id) {
            $ngBootbox.confirm('Are you sure?').then(function () {
                var config = {
                    params: {
                        id:id
                    }
                }
                apiService.del('api/productcategory/delete', config, function () {
                    notificationService.displaySuccess('Deleted successfully');
                    search();
                }, function () {
                    notificationService.displayError('Remove items unsuccessfully.');
                })
            });
        }
            
        function search() {
            getProductCategories();
        }

        function getProductCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword:$scope.keyword,
                    page: page,
                    pageSize:20
                }
            }
            apiService.get('/api/productcategory/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('Not found any record.');
                }
                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;//nho dung ten thuoc tinh cua no
                $scope.totalCount = result.data.TotalCount;
            }, function () {//failure
                console.log('Load Product Categories failed.');
            });
        }

        $scope.getProductCategories();

    }
})(angular.module('tedushop.product_categories'));