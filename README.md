# tagDirective
tagDirective is an angular directive derived from [ngTagEditor](https://github.com/varyoo/ngTagEditor/blob/master/test.html)

fancySelect is another angular directive derived from [Ionic fancySelect](http://codepen.io/mhartington/pen/CImqy)

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

model =
	models: 		[{text: value, selected: true|false}, ...]

<fancy-select template-url="../select.html" ng-model="model" multiple title="choose countries">
</fancy-select>
```

### Suggestions / Auto Complete
filter attribute defines url to fetch the suggested tags already defined by user earlier. For example, file app with url 'file/api/tag' to fetch tags already defined by current login user. 