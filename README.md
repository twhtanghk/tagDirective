# tagDirective
tagDirective is an angular directive derived from [ngTagEditor](https://github.com/varyoo/ngTagEditor/blob/master/test.html)

fancySelect and fancySelectModel is another angular directive derived from [Ionic fancySelect](http://codepen.io/mhartington/pen/CImqy)

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

collection = [{label: label1, value: value1, selected: true|false}, {label: label2, value: value2, selected: true|false}...]
<fancy-select template-url="../select.html" ng-model="collection" multiple title="choose countries">
</fancy-select>

<fancy-select-model template-url="../selectModel.html" ng-selected="selected" ng-model="collection" label="label" multiple title="Choose countries from collection">
</fancy-select-model>	
```

### Suggestions / Auto Complete
filter attribute defines url to fetch the suggested tags already defined by user earlier. For example, file app with url 'file/api/tag' to fetch tags already defined by current login user. 