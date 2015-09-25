(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./tag.coffee');

require('./select.coffee');

require('./icon.coffee');



},{"./icon.coffee":2,"./select.coffee":3,"./tag.coffee":4}],2:[function(require,module,exports){

/*
icon tag to show specified src file or ionic icon if src is not defined  

<icon class="photoEdit" 
	ng-src="model.photoUrl"
	ngf-select ngf-multiple='false' 
	ngf-change="select($files)" 
	ngf-accept="'image/*'"
	aria-label="{{model.name}}"
	otherwise="icon ion-android-people">
 */
var iconDir;

iconDir = function($compile) {
  return {
    restrict: 'E',
    scope: {
      src: '=ngSrc',
      label: '@ariaLabel',
      otherwise: '@otherwise',
      "class": '@'
    },
    link: function(scope, elem, attrs) {
      var html;
      _.defaults(scope, {
        label: '',
        "class": ''
      });
      html = function(replace) {
        var template;
        template = "<i class='" + scope["class"] + " " + scope.otherwise + "'></i>";
        if (scope.src) {
          template = "<img class='" + scope["class"] + "' src='" + scope.src + "' aria-label='" + scope.label + "'>";
        }
        if (replace) {
          return elem.replaceWith(template);
        } else {
          return elem.html(template);
        }
      };
      html(scope.replace);
      return scope.$watch('src', function(newvalue, oldvalue) {
        if (newvalue !== oldvalue) {
          return html(scope.replace);
        }
      });
    }
  };
};

angular.module('ngIcon', ['ionic']).directive('icon', ['$compile', iconDir]);



},{}],3:[function(require,module,exports){

/*
select from array of primitive

<fancy-select template-url="../select.html" ng-selected="simpleSelected" ng-model="simple" multiple title="Choose countries">
</fancy-select>
 */
var selectDir, selectModelDir, selectObjectDir;

selectDir = function($ionicPlatform, $ionicModal) {
  return {
    restrict: 'E',
    scope: {
      selected: '=ngSelected',
      model: '=ngModel'
    },
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || '../select.html';
    },
    link: function(scope, element, attrs) {
      return _.extend(scope, {
        multiple: 'multiple' in attrs && attrs.multiple !== 'false',
        title: attrs.title || 'Select',
        selectedTitle: function() {
          if (scope.selected.length === 0) {
            return scope.title;
          } else {
            if (scope.multiple) {
              return scope.selected.length + " Selected";
            } else {
              return scope.selected;
            }
          }
        },
        click: function(event) {
          return $ionicModal.fromTemplateUrl("fancy-select.html", {
            scope: scope
          }).then(function(modal) {
            var deregister;
            _.extend(scope, {
              modal: modal,
              close: function() {
                deregister();
                return modal.remove();
              },
              select: function(item) {
                if (scope.multiple) {
                  if (item.selected) {
                    return scope.selected = _.uniq(_.union(scope.selected, [item.label]), true);
                  } else {
                    return scope.selected = _.difference(scope.selected, [item.label]);
                  }
                } else {
                  scope.selected = item.label;
                  return scope.close();
                }
              }
            });
            deregister = $ionicPlatform.registerBackButtonAction(scope.close, 401);
            return modal.show();
          });
        }
      });
    }
  };
};


/*
select from array of object

<fancy-select-object template-url="../select.html" ng-selected="objSelected" ng-model="object" multiple title="Choose currencies">
</fancy-select-object>
 */

selectObjectDir = function($ionicPlatform, $ionicModal) {
  return {
    restrict: 'E',
    scope: {
      selected: '=ngSelected',
      model: '=ngModel'
    },
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || '../select.html';
    },
    link: function(scope, element, attrs) {
      return _.extend(scope, {
        multiple: 'multiple' in attrs && attrs.multiple !== 'false',
        title: attrs.title || 'Select',
        selectedTitle: function() {
          var selected;
          selected = scope.selected;
          if (selected.length === 0) {
            return scope.title;
          } else {
            if (scope.multiple) {
              return selected.length + " Selected";
            } else {
              return selected.label;
            }
          }
        },
        click: function(event) {
          var selected;
          selected = {
            clearModel: function() {
              return _.each(scope.model, function(item) {
                item.selected = false;
                return item;
              });
            },
            fromModel: function() {
              if (scope.multiple) {
                scope.selected.length = 0;
                return scope.selected = _.union(scope.selected, _.where(scope.model, {
                  selected: true
                }));
              } else {
                return scope.selected = _.findWhere(scope.model, {
                  selected: true
                });
              }
            },
            toModel: function() {
              var found;
              if (scope.multiple) {
                return _.each(scope.selected, function(item) {
                  var found;
                  found = _.findWhere(scope.model, {
                    label: item.label
                  });
                  if (found != null) {
                    found.selected = true;
                  }
                  return item;
                });
              } else {
                found = _.findWhere(scope.model, {
                  label: scope.selected.label
                });
                return found != null ? found.selected = true : void 0;
              }
            }
          };
          selected.clearModel();
          selected.toModel();
          return $ionicModal.fromTemplateUrl("fancy-select-object.html", {
            scope: scope
          }).then(function(modal) {
            var deregister;
            _.extend(scope, {
              modal: modal,
              close: function() {
                selected.fromModel();
                deregister();
                return modal.remove();
              },
              select: function(item) {
                if (!scope.multiple) {
                  selected.clearModel();
                  item.selected = true;
                  return scope.close();
                }
              }
            });
            deregister = $ionicPlatform.registerBackButtonAction(scope.close, 401);
            return modal.show();
          });
        }
      });
    }
  };
};


/*
select from pageableAR.collection

<fancy-select-model template-url="../selectModel.html" ng-selected="selected" ng-model="collection" label="fullname" title="Select users">
</fancy-select-model>
 */

selectModelDir = function($ionicPlatform, $ionicModal) {
  return {
    restrict: 'E',
    scope: {
      selected: '=ngSelected',
      model: '=ngModel'
    },
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || '../select.html';
    },
    link: function(scope, element, attrs) {
      return _.extend(scope, {
        multiple: 'multiple' in attrs && attrs.multiple !== 'false',
        title: attrs.title || 'Select',
        label: attrs.label,
        selectedTitle: function() {
          var selected;
          selected = scope.selected;
          if (selected.length === 0) {
            return scope.title;
          } else {
            if (scope.multiple) {
              return selected.length + " Selected";
            } else {
              return selected[scope.label];
            }
          }
        },
        click: function(event) {
          var selected;
          selected = {
            clearModel: function() {
              return _.each(scope.model.models, function(item) {
                item.selected = false;
                return item;
              });
            },
            fromModel: function() {
              if (scope.multiple) {
                scope.selected.length = 0;
                return scope.selected = _.union(scope.selected, _.where(scope.model.models, {
                  selected: true
                }));
              } else {
                return scope.selected = _.findWhere(scope.model.models, {
                  selected: true
                });
              }
            },
            toModel: function(start, end) {
              var found;
              if (start == null) {
                start = 0;
              }
              if (end == null) {
                end = scope.model.models.length;
              }
              if (scope.multiple) {
                return _.each(scope.selected, function(item, index) {
                  var found;
                  found = _.findWhere(_.slice(scope.model.models, start, end), {
                    id: item.id
                  });
                  if (found != null) {
                    found.selected = true;
                  }
                  return item;
                });
              } else {
                found = _.findWhere(_.slice(scope.model.models, start, end), {
                  id: scope.selected.id
                });
                return found != null ? found.selected = true : void 0;
              }
            }
          };
          selected.clearModel();
          selected.toModel();
          return $ionicModal.fromTemplateUrl("fancy-select-model.html", {
            scope: scope
          }).then(function(modal) {
            var deregister;
            _.extend(scope, {
              modal: modal,
              close: function() {
                selected.fromModel();
                deregister();
                return modal.remove();
              },
              select: function(item) {
                if (!scope.multiple) {
                  selected.clearModel();
                  item.selected = true;
                  return scope.close();
                }
              },
              loadMore: function() {
                var skip;
                if (scope.model.state) {
                  skip = scope.model.state.skip;
                  return scope.model.$fetch().then(function() {
                    selected.toModel(skip, scope.model.models.length);
                    return scope.$broadcast('scroll.infiniteScrollComplete');
                  })["catch"](alert);
                }
              }
            });
            deregister = $ionicPlatform.registerBackButtonAction(scope.close, 401);
            return modal.show();
          });
        }
      });
    }
  };
};

angular.module('ngFancySelect', ['ionic']).directive('fancySelect', ['$ionicPlatform', '$ionicModal', selectDir]).directive('fancySelectObject', ['$ionicPlatform', '$ionicModal', selectObjectDir]).directive('fancySelectModel', ['$ionicPlatform', '$ionicModal', selectModelDir]);



},{}],4:[function(require,module,exports){
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
