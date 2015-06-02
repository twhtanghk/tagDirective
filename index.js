(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./tag.coffee');

require('./select.coffee');



},{"./select.coffee":2,"./tag.coffee":3}],2:[function(require,module,exports){

/*
model =
	models: 		[{text: value, selected: true|false}, ...]

<fancy-select template-url="../select.html" ng-model="model" multiple title="choose countries">
</fancy-select>
 */
var selectDir;

selectDir = function($ionicModal) {
  return {
    scope: {
      model: '=ngModel'
    },
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || '../select.html';
    },
    link: function(scope, element, attrs) {
      _.extend(scope, {
        multiple: 'multiple' in attrs && attrs.multiple !== 'false',
        title: attrs.title || 'Select'
      });
      scope.selected = function() {
        var ret;
        ret = _.map(_.where(scope.model.models, {
          selected: true
        }), function(item) {
          return item.text;
        });
        return ret.join(", ");
      };
      return scope.click = function(event) {
        return $ionicModal.fromTemplateUrl("fancy-select-items.html", {
          scope: scope
        }).then(function(modal) {
          modal.show();
          scope.modal = modal;
          scope.close = function() {
            return modal.remove();
          };
          return scope.select = function(item) {
            if (!scope.multiple) {
              _.each(scope.model.models, function(item) {
                return item.selected = false;
              });
              item.selected = true;
              return modal.remove();
            }
          };
        });
      };
    }
  };
};

angular.module('ngFancySelect', ['ionic']).directive('fancySelect', ['$ionicModal', selectDir]);



},{}],3:[function(require,module,exports){
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
  $scope.$watch('search', function(newsearch, oldsearch) {
    if (newsearch !== oldsearch && $scope.options.fetch) {
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

angular.module('ngTagEditor', []).directive('tagEditor', tagDir);



},{}]},{},[1]);
