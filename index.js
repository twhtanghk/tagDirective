(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./tag.coffee');

require('./select.coffee');

require('./icon.coffee');

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3RtcC90YWdEaXJlY3RpdmUvaW5kZXguY29mZmVlIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL3RtcC90YWdEaXJlY3RpdmUvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsQ0FBUSxjQUFSOztBQUNBLE9BQUEsQ0FBUSxpQkFBUjs7QUFDQSxPQUFBLENBQVEsZUFBUiJ9

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3RtcC90YWdEaXJlY3RpdmUvaWNvbi5jb2ZmZWUiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvdG1wL3RhZ0RpcmVjdGl2ZS9pY29uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7O0FBQUEsSUFBQTs7QUFZQSxPQUFBLEdBQVUsU0FBQyxRQUFEO1NBQ1Q7SUFBQSxRQUFBLEVBQVUsR0FBVjtJQUVBLEtBQUEsRUFDQztNQUFBLEdBQUEsRUFBTSxRQUFOO01BQ0EsS0FBQSxFQUFRLFlBRFI7TUFFQSxTQUFBLEVBQVcsWUFGWDtNQUdBLENBQUEsS0FBQSxDQUFBLEVBQVEsR0FIUjtLQUhEO0lBUUEsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLElBQVIsRUFBYyxLQUFkO0FBQ0wsVUFBQTtNQUFBLENBQUMsQ0FBQyxRQUFGLENBQVcsS0FBWCxFQUNDO1FBQUEsS0FBQSxFQUFRLEVBQVI7UUFDQSxDQUFBLEtBQUEsQ0FBQSxFQUFRLEVBRFI7T0FERDtNQUlBLElBQUEsR0FBTyxTQUFDLE9BQUQ7QUFDTixZQUFBO1FBQUEsUUFBQSxHQUFXLFlBQUEsR0FBYSxLQUFLLEVBQUMsS0FBRCxFQUFsQixHQUF5QixHQUF6QixHQUE0QixLQUFLLENBQUMsU0FBbEMsR0FBNEM7UUFDdkQsSUFBRyxLQUFLLENBQUMsR0FBVDtVQUNDLFFBQUEsR0FBVyxjQUFBLEdBQWUsS0FBSyxFQUFDLEtBQUQsRUFBcEIsR0FBMkIsU0FBM0IsR0FBb0MsS0FBSyxDQUFDLEdBQTFDLEdBQThDLGdCQUE5QyxHQUE4RCxLQUFLLENBQUMsS0FBcEUsR0FBMEUsS0FEdEY7O1FBRUEsSUFBRyxPQUFIO2lCQUNDLElBQUksQ0FBQyxXQUFMLENBQWlCLFFBQWpCLEVBREQ7U0FBQSxNQUFBO2lCQUdDLElBQUksQ0FBQyxJQUFMLENBQVUsUUFBVixFQUhEOztNQUpNO01BU1AsSUFBQSxDQUFLLEtBQUssQ0FBQyxPQUFYO2FBQ0EsS0FBSyxDQUFDLE1BQU4sQ0FBYSxLQUFiLEVBQW9CLFNBQUMsUUFBRCxFQUFXLFFBQVg7UUFDbkIsSUFBRyxRQUFBLEtBQVksUUFBZjtpQkFDQyxJQUFBLENBQUssS0FBSyxDQUFDLE9BQVgsRUFERDs7TUFEbUIsQ0FBcEI7SUFmSyxDQVJOOztBQURTOztBQTRCVixPQUFPLENBQUMsTUFBUixDQUFlLFFBQWYsRUFBeUIsQ0FBQyxPQUFELENBQXpCLENBQ0MsQ0FBQyxTQURGLENBQ1ksTUFEWixFQUNvQixDQUFDLFVBQUQsRUFBYSxPQUFiLENBRHBCIn0=

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
                return scope.selected = _.union(scope.selected, _.filter(scope.model, {
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
                return scope.selected = _.union(scope.selected, _.filter(scope.model.models, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3RtcC90YWdEaXJlY3RpdmUvc2VsZWN0LmNvZmZlZSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi90bXAvdGFnRGlyZWN0aXZlL3NlbGVjdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7QUFBQSxJQUFBOztBQU1BLFNBQUEsR0FBWSxTQUFDLGNBQUQsRUFBaUIsV0FBakI7U0FDWDtJQUFBLFFBQUEsRUFBVSxHQUFWO0lBRUEsS0FBQSxFQUNDO01BQUEsUUFBQSxFQUFVLGFBQVY7TUFDQSxLQUFBLEVBQVEsVUFEUjtLQUhEO0lBTUEsT0FBQSxFQUFTLElBTlQ7SUFRQSxXQUFBLEVBQWEsU0FBQyxPQUFELEVBQVUsS0FBVjthQUNaLEtBQUssQ0FBQyxXQUFOLElBQXFCO0lBRFQsQ0FSYjtJQVdBLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLEtBQWpCO2FBQ0wsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFULEVBQ0M7UUFBQSxRQUFBLEVBQVUsVUFBQSxJQUFjLEtBQWQsSUFBdUIsS0FBSyxDQUFDLFFBQU4sS0FBa0IsT0FBbkQ7UUFFQSxLQUFBLEVBQVEsS0FBSyxDQUFDLEtBQU4sSUFBZSxRQUZ2QjtRQUlBLGFBQUEsRUFBZ0IsU0FBQTtVQUNmLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFmLEtBQXlCLENBQTVCO0FBQ0MsbUJBQU8sS0FBSyxDQUFDLE1BRGQ7V0FBQSxNQUFBO1lBR1EsSUFBRyxLQUFLLENBQUMsUUFBVDtxQkFBMEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFoQixHQUF1QixZQUFoRDthQUFBLE1BQUE7cUJBQWdFLEtBQUssQ0FBQyxTQUF0RTthQUhSOztRQURlLENBSmhCO1FBVUEsS0FBQSxFQUFRLFNBQUMsS0FBRDtpQkFDUCxXQUFXLENBQUMsZUFBWixDQUE0QixtQkFBNUIsRUFBaUQ7WUFBQSxLQUFBLEVBQU8sS0FBUDtXQUFqRCxDQUNDLENBQUMsSUFERixDQUNPLFNBQUMs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

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3RtcC90YWdEaXJlY3RpdmUvdGFnLmNvZmZlZSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi90bXAvdGFnRGlyZWN0aXZlL3RhZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxlQUFBO0VBQUE7O0FBQUEsT0FBQSxHQUFVLFNBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkIsS0FBM0I7RUFDVCxNQUFBLEdBQVMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFULEVBQ1I7SUFBQSxPQUFBLEVBQ0M7TUFBQSxLQUFBLEVBQVUsTUFBTSxDQUFDLEtBQVAsSUFBZ0IsS0FBMUI7TUFDQSxXQUFBLEVBQWEsTUFBTSxDQUFDLFdBQVAsSUFBc0Isa0NBRG5DO0tBREQ7SUFHQSxNQUFBLEVBQVUsRUFIVjtHQURRO0VBTVQsTUFBTSxDQUFDLEdBQVAsR0FBYSxTQUFDLEdBQUQ7SUFDWixJQUFHLGFBQVcsTUFBTSxDQUFDLElBQWxCLEVBQUEsR0FBQSxLQUFIO2FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFaLENBQWlCLEdBQWpCLEVBREQ7O0VBRFk7RUFJYixNQUFNLENBQUMsTUFBUCxHQUFnQixTQUFDLE1BQUQ7V0FDZixNQUFNLENBQUMsSUFBUCxHQUFjLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBTSxDQUFDLElBQWhCLEVBQXNCLFNBQUMsR0FBRDthQUNuQyxHQUFBLEtBQU87SUFENEIsQ0FBdEI7RUFEQztFQUloQixNQUFNLENBQUMsTUFBUCxDQUFjLFFBQWQsRUFBd0IsU0FBQyxTQUFELEVBQVksU0FBWjtJQUN2QixJQUFHLFNBQUEsS0FBYSxTQUFiLElBQTJCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBN0M7YUFDQyxLQUFLLENBQUMsR0FBTixDQUFhLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBaEIsR0FBc0IsR0FBdEIsR0FBeUIsTUFBTSxDQUFDLE1BQTVDLENBQ0MsQ0FBQyxJQURGLENBQ08sU0FBQyxJQUFEO2VBQ0wsTUFBTSxDQUFDLFdBQVAsR0FBcUIsSUFBSSxDQUFDO01BRHJCLENBRFAsQ0FHQyxFQUFDLEtBQUQsRUFIRCxDQUdRLEtBSFIsRUFERDs7RUFEdUIsQ0FBeEI7U0FPQSxRQUFRLENBQUMsSUFBVCxDQUFjLE9BQWQsQ0FBc0IsQ0FBQyxFQUF2QixDQUEwQixTQUExQixFQUFxQyxTQUFDLEtBQUQ7QUFDcEMsUUFBQTtJQUFBLElBQUEsR0FBTyxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUjtJQUNQLElBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFYLEVBQWlCLEtBQUssQ0FBQyxLQUF2QixDQUFIO0FBQ0MsY0FBTyxLQUFLLENBQUMsS0FBYjtBQUFBLGFBQ00sQ0FETjtVQUVFLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFkLEtBQXdCLENBQXhCLElBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBNUM7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQVosQ0FBQTtZQUNBLEtBQUssQ0FBQyxjQUFOLENBQUEsRUFGRDs7QUFESTtBQUROLGFBS00sRUFMTjtVQU1FLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFqQjtZQUNDLE1BQU0sQ0FBQyxHQUFQLENBQVcsTUFBTSxDQUFDLE1BQWxCO1lBQ0EsS0FBSyxDQUFDLGNBQU4sQ0FBQSxFQUZEOztBQURJO0FBTE4sYUFTTSxFQVROO1VBVUUsSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWpCO1lBQ0MsTUFBTSxDQUFDLEdBQVAsQ0FBVyxNQUFNLENBQUMsTUFBbEI7WUFDQSxLQUFLLENBQUMsY0FBTixDQUFBLEVBRkQ7O0FBREk7QUFUTjtBQWNFO0FBZEYsT0FERDs7V0FnQkEsTUFBTSxDQUFDLE1BQVAsQ0FBQTtFQWxCb0MsQ0FBckM7QUF0QlM7O0FBMENWLE1BQUEsR0FBUyxTQUFBO1NBQ1I7SUFBQSxLQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQU0sVUFBTjtLQUREO0lBR0EsT0FBQSxFQUFTLElBSFQ7SUFLQSxXQUFBLEVBQWEsU0FBQyxJQUFELEVBQU8sSUFBUDthQUNaLElBQUksQ0FBQyxXQUFMLElBQW9CO0lBRFIsQ0FMYjtJQVFBLFVBQUEsRUFBWSxDQUFFLFFBQUYsRUFBWSxRQUFaLEVBQXNCLFVBQXRCLEVBQWtDLE9BQWxDLEVBQTJDLE9BQTNDLENBUlo7O0FBRFE7O0FBV1QsT0FBTyxDQUFDLE1BQVIsQ0FBZSxhQUFmLEVBQThCLEVBQTlCLENBQ0MsQ0FBQyxTQURGLENBQ1ksV0FEWixFQUN5QixNQUR6QiJ9

},{}]},{},[1]);
