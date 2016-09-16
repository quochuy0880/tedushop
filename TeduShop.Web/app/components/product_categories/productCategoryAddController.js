(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);

    productCategoryAddController.$inject = ['apiService', '$scope', 'notificationService','$state'];

    function productCategoryAddController(apiService, $scope, notificationService,$state) {
        $scope.productCategory = {
            CreDate: new Date(),
            Status:true
        }

        $scope.AddProductCategory = AddProductCategory;
        function AddProductCategory() {
            apiService.post('api/productcategory/create', $scope.productCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + ' added successfully.');
                $state.go('product_categories');
            }, function (error) {
                notificationService.displayError('Add new product category unsuccessfully.');
            });
        }

        function loadParentCategory() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        }

        loadParentCategory();
    }
})(angular.module('tedushop.product_categories'));