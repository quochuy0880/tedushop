(function (app) {
    app.controller('productCategoryListController', productCategoryListController);
    
    productCategoryListController.$inject = ['$scope','apiService'];
    function productCategoryListController($scope, apiService) {
        $scope.productCategories = [];//khai bao mang rong
        $scope.getProductCategories = getProductCategories;

        function getProductCategories() {
            apiService.get('/api/productcategory/getall', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {//failure
                console.log('Load Product Categories failed.');
            });
        }

        $scope.getProductCategories();
    }
})(angular.module('tedushop.product_categories'));