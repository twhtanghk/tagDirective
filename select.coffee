###
model =
	models: 		[{text: value, selected: true|false}, ...]

<fancy-select template-url="../select.html" ng-model="model" multiple title="choose countries">
</fancy-select>
###
selectDir = ($ionicModal) ->
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
			ret = _.map _.where(scope.model.models, selected: true), (item) ->
				item.text
			ret.join(", ")
			
		scope.click = (event) ->
			$ionicModal.fromTemplateUrl("fancy-select-items.html", scope: scope)
				.then (modal) ->
					modal.show()
					scope.modal = modal
					scope.close = ->
						modal.remove()
					scope.select = (item) ->
						if not scope.multiple
							_.each scope.model.models, (item) ->
								item.selected = false
							item.selected = true
							modal.remove()
					
angular.module('ngFancySelect', ['ionic'])
	.directive 'fancySelect', ['$ionicModal', selectDir]