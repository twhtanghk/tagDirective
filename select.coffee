###
select from array of primitive

<fancy-select template-url="../select.html" ng-selected="simpleSelected" ng-model="simple" multiple title="Choose countries">
</fancy-select>		
###
selectDir = ($ionicPlatform, $ionicModal) ->
	restrict:	'E'
	
	scope:
		selected:	'=ngSelected'
		model:		'=ngModel'
			
	replace:	true
	
	templateUrl: (element, attrs) ->
		attrs.templateUrl || '../select.html'
		
	link: (scope, element, attrs) ->
		_.extend scope, 
			multiple:	'multiple' of attrs && attrs.multiple != 'false'

			title:		attrs.title || 'Select'

			selectedTitle:	 ->
				if scope.selected.length == 0 
					return scope.title
				else
					return if scope.multiple then "#{scope.selected.length} Selected" else scope.selected 
			
			click:		(event) ->
				$ionicModal.fromTemplateUrl("fancy-select.html", scope: scope)
					.then (modal) ->
						_.extend scope,
							modal:	modal
							
							close:	->
								deregister()
								modal.remove()
							
							select: (item) ->
								if scope.multiple
									if item.selected
										scope.selected = _.uniq _.union(scope.selected, [item.label]), true
									else
										scope.selected = _.difference scope.selected, [item.label]
								else
									scope.selected = item.label
									scope.close()
						
						deregister = $ionicPlatform.registerBackButtonAction scope.close, 401
    								
						modal.show()


###
select from array of object

<fancy-select-object template-url="../select.html" ng-selected="objSelected" ng-model="object" multiple title="Choose currencies">
</fancy-select-object>
###
selectObjectDir = ($ionicPlatform, $ionicModal) ->
	restrict:	'E'
	
	scope:
		selected:	'=ngSelected'
		model:		'=ngModel'
			
	replace:	true
	
	templateUrl: (element, attrs) ->
		attrs.templateUrl || '../select.html'
		
	link: (scope, element, attrs) ->
		_.extend scope, 
			multiple:	'multiple' of attrs && attrs.multiple != 'false'
			
			title:		attrs.title || 'Select'
			
			selectedTitle:	->
				selected = scope.selected
				if selected.length == 0 
					return scope.title
				else
					return if scope.multiple then "#{selected.length} Selected" else selected.label
			
			click:		(event) ->
				selected =
					clearModel: ->
						_.each scope.model, (item) ->
							item.selected = false
							return item
					
					fromModel: ->
						if scope.multiple
							scope.selected.length = 0
							scope.selected = _.union scope.selected, _.filter(scope.model, selected: true)
						else
							scope.selected = _.findWhere scope.model, selected: true
						
					toModel: ->
						if scope.multiple
							_.each scope.selected, (item) ->
								found = _.findWhere scope.model, label: item.label
								found?.selected = true
								return item
						else
							found = _.findWhere scope.model, label: scope.selected.label
							found?.selected = true
				
				selected.clearModel()
				selected.toModel()
						
				$ionicModal.fromTemplateUrl("fancy-select-object.html", scope: scope)
					.then (modal) ->
						_.extend scope, 
							modal: modal
							
							close: ->
								selected.fromModel()
								deregister()
								modal.remove()
								
							select: (item) ->
								if not scope.multiple
									selected.clearModel()
									item.selected = true
									scope.close()
						
						deregister = $ionicPlatform.registerBackButtonAction scope.close, 401
    						
						modal.show()
					
###
select from pageableAR.collection

<fancy-select-model template-url="../selectModel.html" ng-selected="selected" ng-model="collection" label="fullname" title="Select users">
</fancy-select-model>
###
selectModelDir = ($ionicPlatform, $ionicModal) ->
	restrict:	'E'
	
	scope:
		selected:	'=ngSelected'
		model:		'=ngModel'
			
	replace:	true
	
	templateUrl: (element, attrs) ->
		attrs.templateUrl || '../select.html'
		
	link: (scope, element, attrs) ->
		_.extend scope, 
			multiple:	'multiple' of attrs && attrs.multiple != 'false'

			title:		attrs.title || 'Select'

			label:		attrs.label

			selectedTitle:	 ->
				selected = scope.selected 
				if selected.length == 0 
					return scope.title
				else
					return if scope.multiple then "#{selected.length} Selected" else selected[scope.label] 
			
			click:		(event) ->
				selected =
					clearModel: ->
						_.each scope.model.models, (item) ->
							item.selected = false
							return item
					
					fromModel: ->
						if scope.multiple
							scope.selected.length = 0
							scope.selected = _.union scope.selected, _.filter(scope.model.models, selected: true)
						else
							scope.selected = _.findWhere scope.model.models, selected: true
						
					toModel: (start = 0, end = scope.model.models.length) ->
						if scope.multiple
							_.each scope.selected, (item, index) ->
								found = _.findWhere _.slice(scope.model.models, start, end), id: item.id
								found?.selected = true
								return item
						else
							found = _.findWhere _.slice(scope.model.models, start, end), id: scope.selected.id
							found?.selected = true
				
				selected.clearModel()
				selected.toModel()
				
				$ionicModal.fromTemplateUrl("fancy-select-model.html", scope: scope)
					.then (modal) ->
						_.extend scope,
							modal: modal
							
							close: ->
								selected.fromModel()
								deregister()
								modal.remove()
								
							select: (item) ->
								if not scope.multiple
									selected.clearModel()
									item.selected = true
									scope.close()
							
							loadMore: ->
								if scope.model.state
									skip = scope.model.state.skip
									scope.model.$fetch()
										.then ->
											selected.toModel(skip, scope.model.models.length)
											scope.$broadcast('scroll.infiniteScrollComplete')
										.catch alert
						
						deregister = $ionicPlatform.registerBackButtonAction scope.close, 401
    					
						modal.show()

angular.module('ngFancySelect', ['ionic'])
	.directive 'fancySelect', ['$ionicPlatform', '$ionicModal', selectDir]
	.directive 'fancySelectObject', ['$ionicPlatform', '$ionicModal', selectObjectDir]
	.directive 'fancySelectModel', ['$ionicPlatform', '$ionicModal', selectModelDir]
