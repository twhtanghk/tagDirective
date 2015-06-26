###
model = [{label: label1, value: value1, selected: true|false}, {label: label2, value: value2, selected: true|false}...]

<fancy-select template-url="../select.html" ng-model="model" multiple title="choose countries">
</fancy-select>
###
selectDir = ($ionicModal) ->
	restrict:	'E'
	
	scope:
		model:	'=ngModel'
			
	replace:	true
	
	templateUrl: (element, attrs) ->
		attrs.templateUrl || '../select.html'
		
	link: (scope, element, attrs) ->
		_.extend scope, 
			multiple:	'multiple' of attrs && attrs.multiple != 'false'
			title:		attrs.title || 'Select'
			
		scope.selected = ->
			ret = _.map _.where(scope.model, selected: true), (item) ->
				item.value
			ret.join(", ")
			
		scope.click = (event) ->
			$ionicModal.fromTemplateUrl("fancy-select-items.html", scope: scope)
				.then (modal) ->
					scope.modal = modal
					scope.close = ->
						scope.$emit 'selected', _.map _.where(scope.model, selected: true), (item) ->
							item.value 
						modal.remove()
					scope.select = (item) ->
						if not scope.multiple
							_.each scope.model, (item) ->
								_.extend item, selected: false
							item.selected = true
							scope.close()
					modal.show()
					
angular.module('ngFancySelect', ['ionic'])
	.directive 'fancySelect', ['$ionicModal', selectDir]