"use strict";

chromeMyAdmin.controller("NavbarController", ["$scope", "mySQLClientService", "modeService", "targetObjectService", function($scope, mySQLClientService, modeService, targetObjectService) {

    var loadDatabaseList = function() {
        mySQLClientService.getDatabases().then(function(databases) {
            $scope.safeApply(function() {
                $scope.selectedDatabase = "[Select database]";
                $scope.databases = databases;
            });
        });
    };

    var onConnectionChanged = function(connectionInfo) {
        if (mySQLClientService.isConnected()) {
            $scope.safeApply(function() {
                targetObjectService.resetDatabase();
                loadDatabaseList();
                $scope.connectionInfo = connectionInfo;
                $("body").popover({
                    placement: "bottom",
                    trigger: "hover",
                    html: true,
                    content: function() {
                        var info = $scope.connectionInfo;
                        return "Server: " +
                            info.hostName + ":" + info.port + "<br />" +
                            "MySQL version: " +
                            info.initialHandshakeRequest.serverVersion;
                    },
                    container: "body",
                    selector: "[rel=\"popover\"]"
                });
            });
        }
    };

    $scope.initialize = function() {
        $scope.$on("connectionChanged", function(event, connectionInfo) {
            onConnectionChanged(connectionInfo);
        });
        $scope.selectedDatabase = "[Select database]";
    };

    $scope.isNavbarVisible = function() {
        return mySQLClientService.isConnected();
    };

    $scope.selectDatabase = function(event, database) {
        $scope.selectedDatabase = database;
        targetObjectService.changeDatabase(database);
    };

    $scope.logout = function(event) {
        $("#logoutConfirmDialog").modal("show");
    };

    $scope.isRowsActive = function() {
        return modeService.getMode() === "rows";
    };

    $scope.isStructureActive = function() {
        return modeService.getMode() === "structure";
    };

    $scope.isQueryActive = function() {
        return modeService.getMode() === "query";
    };

    $scope.selectRows = function() {
        modeService.changeMode("rows");
    };

    $scope.selectStructure = function() {
        modeService.changeMode("structure");
    };

    $scope.selectQuery = function() {
        modeService.changeMode("query");
    };

    $scope.showDatabaseInfo = function() {
        console.log("showDatabaseInfo");
    };

}]);