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
			
			selected:	->
				selected = _.where scope.model, selected: true 
				if selected.length == 0 
					return null
				else
					return if scope.multiple then "#{selected.length} Selected" else selected[0].label
			
			click:		(event) ->
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
					
###
collection = [model1, model2, ...] where model attribute "selected" is defined to be true, false or undefined 

<fancy-select-model template-url="../select.html" ng-model="collection" label="name" multiple title="choose countries">
</fancy-select-model>
###
selectModelDir = ($ionicModal) ->
	restrict:	'E'
	
	scope:
		model:	'=ngModel'
			
	replace:	true
	
	templateUrl: (element, attrs) ->
		attrs.templateUrl || '../selectModel.html'
		
	link: (scope, element, attrs) ->
		_.extend scope, 
			multiple:	'multiple' of attrs && attrs.multiple != 'false'

			title:		attrs.title || 'Select'

			label:		attrs.label

			selected:	 ->
				selected = _.where scope.model, selected: true 
				if selected.length == 0 
					return null
				else
					return if scope.multiple then "#{selected.length} Selected" else selected[0][scope.label] 
			
			click:		(event) ->
				$ionicModal.fromTemplateUrl("fancy-select-models.html", scope: scope)
					.then (modal) ->
						scope.modal = modal
						scope.select = (item) ->
							if not scope.multiple
								_.each scope.model, (item) ->
									_.extend item, selected: false
								item.selected = true
								modal.remove()
						modal.show()

angular.module('ngFancySelect', ['ionic'])
	.directive 'fancySelect', ['$ionicModal', selectDir]
	.directive 'fancySelectModel', ['$ionicModal', selectModelDir]