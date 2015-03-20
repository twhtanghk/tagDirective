# tagDirective
tagDirective is angular tag directive derived from ngTagEditor

## Installation
```
  npm install && bower install
  node_modules/.bin/gulp
  node_modules/.bin/http-server
```

## Demo
`
  open browser to visit http://localhost:8080/test.html
`

## Usage
`
<tag-editor filter='file/api/tag' placeholder='Tag e.g. Team, Confidential, ...'></tag-editor>
`

### Suggestions / Auto Complete
filter attribute defines url to fetch the suggested tags already defined by user earlier. For example,
file app with url 'file/api/tag' to fetch tags already defined by current login user. 