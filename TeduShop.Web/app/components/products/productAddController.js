(function (app) {
    app.controller('productAddController', productAddController);

    productAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];

    function productAddController(apiService, $scope, notificationService, $state) {
        $scope.product = {
            CreDate: new Date(),
            Status: true
        }

        $scope.ckeditorOptions = {
            language: 'en',
            height: '200px'
        }

        $scope.AddProduct = AddProduct;
        function AddProduct() {
            apiService.post('api/product/create', $scope.product, function (result) {
                notificationService.displaySuccess(result.data.Name + ' added successfully.');
                $state.go('products');
            }, function (error) {
                notificationService.displayError('Add new product unsuccessfully.');
            });
        }

        function loadProductCategory() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        }

        $scope.ChooseImage = function ChooseImage() {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.product.Image = fileUrl;
            }
            finder.popup();
        }
        loadProductCategory();
    }
})(angular.module('tedushop.products'));