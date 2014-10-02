chromeMyAdmin.factory("configurationService", ["$rootScope", "$q", "Configurations", function($rootScope, $q, Configurations) {
    "use strict";

    var configurationChangeListeners = [];

    var getConfigurationValue = function(name, defaultValue) {
        var deferred = $q.defer();
        chrome.storage.sync.get("configurations", function(items) {
            var configurations = items.configurations || {};
            var result = configurations[name];
            if (typeof result === "string") {
                if (result) {
                    deferred.resolve(result);
                } else {
                    deferred.resolve(defaultValue);
                }
            } else if (typeof result === "boolean") {
                deferred.resolve(result);
            } else if (typeof result === "number") {
                deferred.resolve(result);
            } else {
                deferred.resolve(defaultValue);
            }
        });
        return deferred.promise;
    };

    var setConfigurationValue = function(name, value) {
        var deferred = $q.defer();
        chrome.storage.sync.get("configurations", function(items) {
            var configurations = items.configurations || {};
            configurations[name] = value;
            chrome.storage.sync.set({configurations: configurations}, function() {
                deferred.resolve();
                notifyConfigurationChanged(name, value);
            });
        });
        return deferred.promise;
    };

    var notifyConfigurationChanged = function(name, value) {
        angular.forEach(configurationChangeListeners, function(listener) {
            listener(name, value);
        });
    };

    return {
        addConfigurationChangeListener: function(listener) {
            configurationChangeListeners.push(listener);
        },
        getDatabaseInfoAutoUpdateSpan: function() {
            return getConfigurationValue(
                Configurations.DATABASE_INFO_AUTO_UPDATE_SPAN,
                Configurations.DEFAULT_DATABASE_INFO_AUTO_UPDATE_SPAN);
        },
        setDatabaseInfoAutoUpdateSpan: function(span) {
            return setConfigurationValue(
                Configurations.DATABASE_INFO_AUTO_UPDATE_SPAN,
                span);
        },
        getRowCountPerPageInRowsPanel: function() {
            return getConfigurationValue(
                Configurations.ROW_COUNT_PER_PAGE_IN_ROWS_PANEL,
                Configurations.DEFAULT_ROW_COUNT_PER_PAGE_IN_ROWS_PANEL);
        },
        setRowCountPerPageInRowsPanel: function(rowCount) {
            return setConfigurationValue(
                Configurations.ROW_COUNT_PER_PAGE_IN_ROWS_PANEL,
                rowCount);
        },
        getQueryEditorWrapMode: function() {
            return getConfigurationValue(
                Configurations.QUERY_EDITOR_WRAP_MODE,
                Configurations.DEFAULT_QUERY_EDITOR_WRAP_MODE);
        },
        setQueryEditorWrapMode: function(wrap) {
            return setConfigurationValue(
                Configurations.QUERY_EDITOR_WRAP_MODE,
                wrap);
        },
        getStatusGraphAutoUpdateSpan: function() {
            return getConfigurationValue(
                Configurations.STATUS_GRAPH_AUTO_UPDATE_SPAN,
                Configurations.DEFAULT_STATUS_GRAPH_AUTO_UPDATE_SPAN);
        },
        setStatusGraphAutoUpdateSpan: function(span) {
            return setConfigurationValue(
                Configurations.STATUS_GRAPH_AUTO_UPDATE_SPAN,
                span);
        }
    };
}]);
