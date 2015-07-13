###
icon tag to show specified src file or ionic icon if src is not defined  

<icon class="photoEdit" 
	ng-src="model.photoUrl"
	ngf-select ngf-multiple='false' 
	ngf-change="select($files)" 
	ngf-accept="'image/*'"
	aria-label="{{model.name}}"
	otherwise="icon ion-android-people">
###

iconDir = ($compile) ->
	restrict:	'E'
	
	scope:
		src:		'=ngSrc'
		label:		'@ariaLabel'
		otherwise:	'@otherwise'
		class:		'@'
			
	link: (scope, elem, attrs) ->
		_.defaults scope,
			label:		''
			class:		''
			
		html = (replace) ->
			template = "<i class='#{scope.class} #{scope.otherwise}'></i>"
			if scope.src
				template = "<img class='#{scope.class}' src='#{scope.src}' aria-label='#{scope.label}'>" 
			if replace
				elem.replaceWith template
			else
				elem.html template
			
		html(scope.replace)
		scope.$watch 'src', (newvalue, oldvalue) ->
			if newvalue != oldvalue
				html(scope.replace)

angular.module('ngIcon', ['ionic'])
	.directive 'icon', ['$compile', iconDir]