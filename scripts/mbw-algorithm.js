const mbwAlgorithm = {
 decode: function (string) {
  var decodedString = "";
  for (var a = 0, b = string.length; a < b;) {
   var c = a++;
   var characterCode = string.charCodeAt(c) - (c * 5 % 33 + 1);
   decodedString += String.fromCodePoint(characterCode);
  }
  return decodedString;
 },
 encode: function (string) {
  var encodedString = "";
  for (var a = 0, b = string.length; a < b;) {
   var c = a++;
   var characterCode = string.charCodeAt(c) + (c * 5 % 33 + 1);
   encodedString += String.fromCodePoint(characterCode);
  }
  return encodedString;
 }
}