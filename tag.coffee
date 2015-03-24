tagCtrl = ($scope, $attrs, $element, $http) ->
	$scope = _.extend $scope,
		options: 
			fetch: 			$attrs.fetch || false
			placeholder:	$attrs.placeholder || 'Tag e.g. Team, Confidential, ...'
		search:			''
				
	$scope.add = (tag) ->
		if tag not in $scope.tags
			$scope.tags.push tag
		
	$scope.remove = (deltag) ->
		$scope.tags = _.filter $scope.tags, (tag) ->
			tag != deltag
	
	$scope.$watch 'search', (newsearch, oldsearch) ->
		if newsearch != oldsearch and $scope.options.fetch
			$http.get("#{$scope.options.fetch}/#{$scope.search}")
				.then (data) ->
					$scope.suggestions = data.data
				.catch alert	
	
	$element.find('input').on 'keydown', (event) ->
		keys = [8, 13, 32]
		if _.contains keys, event.which
			switch event.which
				when 8	# backspace
					if $scope.search.length == 0 && $scope.tags.length
						$scope.tags.pop()
						event.preventDefault()
				when 13 # enter
					if $scope.search.length
						$scope.add $scope.search
						event.preventDefault()
				when 32	# space	
					if $scope.search.length
						$scope.add $scope.search
						event.preventDefault()
				else
					return
		$scope.$apply()

tagDir = ->
	scope:
		tags: '=ngModel'
	
	replace: true
	
	templateUrl: (elem, attr) ->
		attr.templateUrl || 'tag.html'
	
	controller: [ '$scope', '$attrs', '$element', '$http', tagCtrl ]
		
angular.module('ngTagEditor', [])
angular.module('ngTagEditor').directive 'tagEditor', tagDir
