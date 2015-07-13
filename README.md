# tagDirective
tagDirective is an angular directive derived from [ngTagEditor](https://github.com/varyoo/ngTagEditor/blob/master/test.html)

fancySelect and fancySelectModel is another angular directive derived from [Ionic fancySelect](http://codepen.io/mhartington/pen/CImqy)

icon is to render image or icon tag by checking if image src is specified or not.  
## Installation
```
  npm install && bower install
  node_modules/.bin/gulp
  node_modules/.bin/http-server
```

## Demo
open browser to visit http://localhost:8080/test/tag.html or select.html


## Usage
```
tags = ['See', 'how', 'amazing', 'is', 'AngularJS' ]
<tag-editor filter='file/api/tag' ng-model='tags' template-url='../tag.html' placeholder='Tag e.g. Team, Confidential, ...'></tag-editor>

simple = [ 'Brazil', 'China', 'France', 'Italy', 'Japan', 'USA' ]
selected = [ 'China' ]
<fancy-select template-url="../select.html" ng-selected="simpleSelected" ng-model="simple" multiple title="Choose countries">
</fancy-select>
		
object = [
	{label: 'Brazil', value: 'BRL', selected: false}
	{label: 'China', value: 'CNY', selected: true}
	{label: 'France', value: 'EUR', selected: false}
	{label: 'Italy', value: 'EUR', selected: false}
	{label: 'Japan', value: 'JPY', selected: false}
	{label: 'USA', value: 'USD',selected: false}
]
selected = [ object[1] ]
<fancy-select-object template-url="../select.html" ng-selected="objSelected" ng-model="object" label="label" multiple title="Choose currencies">
</fancy-select-object>

<fancy-select-model template-url="../selectModel.html" ng-selected="selected" ng-model="collection" label="fullname" title="Select users">
</fancy-select-model>

<icon class="photoEdit" 
	ng-src="model.photoUrl"
	ngf-select ngf-multiple='false' 
	ngf-change="select($files)" 
	ngf-accept="'image/*'"
	aria-label="{{model.name}}"
	otherwise="icon ion-android-people">
```

### Suggestions / Auto Complete
filter attribute defines url to fetch the suggested tags already defined by user earlier. For example, file app with url 'file/api/tag' to fetch tags already defined by current login user. 