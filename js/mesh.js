function Mesh(name, csvText){
  var self = this;

  self.name = name;
  self.meshArray = convertCsvToArray(csvText);

  function convertCsvToArray(csvText){
    return csvText.split('\n')
      .filter(function(line){
        return line != "";
      })
      .map(function(line){
        return line.split(',').filter(function(elem){
          return elem != "";
        });
      });
  }
}

module.exports = Mesh;
