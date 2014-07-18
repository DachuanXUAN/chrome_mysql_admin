chromeMyAdmin.directive("configurationDialog", function() {
    "use strict";

    return {
        restrict: "E",
        templateUrl: "templates/configuration_dialog.html"
    };
});

chromeMyAdmin.controller("ConfigurationDialogController", ["$scope", "mySQLClientService", "Events", "configurationService", function($scope, mySQLClientService, Events, configurationService) {
    "use strict";

    var doOpen = function() {
        configurationService.getDatabaseInfoAutoUpdateSpan().then(function(span) {
            $scope.databaseInfoAutoUpdateSpan = span / 1000;
            return configurationService.getRowCountPerPageInRowsPanel();
        }).then(function(rowCount) {
            $scope.rowCountPerPageInRowsPanel = rowCount;
        });
        $("#configurationDialog").modal("show");
    };

    var close = function() {
        $("#configurationDialog").modal("hide");
    };

    var assignEventHandlers = function() {
        $scope.$on(Events.SHOW_CONFIGURATION_DIALOG, function(event, data) {
            doOpen();
        });
    };

    $scope.initialize = function() {
        $scope.databaseInfoAutoUpdateSpans = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
        $scope.rowCountsPerPageInRowsPanel = [10, 20, 50, 100, 200, 500, 1000];
        assignEventHandlers();
    };

    $scope.execute = function() {
    };

    $scope.getQueryHistory = function() {
        return mySQLClientService.getQueryHistory();
    };

    $scope.changeSpan = function() {
        configurationService.setDatabaseInfoAutoUpdateSpan(
            Number($scope.databaseInfoAutoUpdateSpan) * 1000);
    };

    $scope.editQuery = function(query) {
        close();
        $scope.showQueryPanel(query);
    };

    $scope.changeRowCount = function() {
        configurationService.setRowCountPerPageInRowsPanel(
            Number($scope.rowCountPerPageInRowsPanel));
    };

}]);
