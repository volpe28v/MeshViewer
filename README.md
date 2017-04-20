# MeshViewer
雨量メッシュデータを可視化する

### Screenshot
![top-page](https://github.com/volpe28v/MeshViewer/blob/images/screenshot.png)

### Usage
* メッシュデータ(481x505)のcsv ファイルをドロップする

### Technology
* Vue.js
* d3.js
* canvas
* google map API

### Shortcut Keys
```
h : move fixed cursor -x
j : move fixed cursor +y
k : move fixed cursor -y
j : move fixed cursor +x
```

### Ready
```
$ npm install
```

### Build
```
$ webpack
```

### Make Test Data
```
$ cd tools
$ ruby csv_gen.rb > test.csv
```
