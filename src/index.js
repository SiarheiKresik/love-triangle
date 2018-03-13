/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
  var count = 0;
  if (preferences.length === 0) return count;
  var actor; // actor: loves object
  var object; // object: is loved by actor
  var seen = [];

  for (var i = 0; i < preferences.length; i++) {
    actor = i
    // pass seen actors
    if (seen.includes(actor)) continue;

    // go actors chain
    var chain = [];
    while (true) {
      chain.push(actor);
      object = preferences[actor] - 1;
      // self-lovers
      if (object == actor) {
        seen = seen.concat(chain)
        break;
      }
      // 
      if (seen.includes(object)) {
        seen = seen.concat(chain);
        break;
      }
      // check for love triangle
      if (chain.includes(object)) {
        if (isLoveTriangle(chain, object)) {
          count += 1;
        }
        seen = seen.concat(chain);
        break;
      }
      actor = object;
    }
  }
  return count;
}

function isLoveTriangle(chain, object) {
  if (chain.length < 2) return false;
  if (chain[chain.length - 3] === object) return true;
  return false;
}
