var tagCtrl, tagDir,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

tagCtrl = function($scope, $attrs, $element, $http) {
  $scope = _.extend($scope, {
    options: {
      fetch: $attrs.fetch || false,
      placeholder: $attrs.placeholder || 'Tag e.g. Team, Confidential, ...'
    },
    search: ''
  });
  $scope.add = function(tag) {
    if (indexOf.call($scope.tags, tag) < 0) {
      return $scope.tags.push(tag);
    }
  };
  $scope.remove = function(deltag) {
    return $scope.tags = _.filter($scope.tags, function(tag) {
      return tag !== deltag;
    });
  };
  $scope.$watch('search', function() {
    if ($scope.options.fetch) {
      return $http.get($scope.options.fetch + "/" + $scope.search).then(function(data) {
        return $scope.suggestions = data.data;
      })["catch"](alert);
    }
  });
  return $element.find('input').on('keydown', function(event) {
    var keys;
    keys = [8, 13, 32];
    if (_.contains(keys, event.which)) {
      switch (event.which) {
        case 8:
          if ($scope.search.length === 0 && $scope.tags.length) {
            $scope.tags.pop();
            event.preventDefault();
          }
          break;
        case 13:
          if ($scope.search.length) {
            $scope.add($scope.search);
            event.preventDefault();
          }
          break;
        case 32:
          if ($scope.search.length) {
            $scope.add($scope.search);
            event.preventDefault();
          }
          break;
        default:
          return;
      }
    }
    return $scope.$apply();
  });
};

tagDir = function() {
  return {
    scope: {
      tags: '=ngModel'
    },
    replace: true,
    templateUrl: function(elem, attr) {
      return attr.templateUrl || 'tag.html';
    },
    controller: ['$scope', '$attrs', '$element', '$http', tagCtrl]
  };
};

angular.module('ngTagEditor', []);

angular.module('ngTagEditor').directive('tagEditor', tagDir);
