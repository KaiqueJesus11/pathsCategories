function getCategories() {
  var root = { id: 'root', parent: null, children: [] };
  var books = { id: 'books', parent: root, children: [] };
  var movies = { id: 'movies', parent: root, children: [] };
  var fantasy = { id: 'fantasy', parent: books, children: [] };
  var tolkien = { id: 'tolkien', parent: fantasy, children: [] };

  root.children = [movies, books];
  books.children = [fantasy];
  fantasy.children = [tolkien];

  return root;
}

function getProductsAssignements() {
  return {
    B001: ['movies', 'fantasy'],
    D8: ['tolkien','fantasy'],
    RX20: [],
  }
}

function getPaths(id) {
  let categories = getCategories()
  let productAssignments = getProductsAssignements();
  list = productAssignments[id];
  if(list === undefined){
    return "EMPTY";
  }
  const paths = verifySubstring(list.map(item =>
    generatePath(verifyNode(item, categories)))
  );
  if (paths.length < 1) {
    return "EMPTY";
  }
  return paths
}

function generatePath(node) {
  if (node) {
    if (node.parent) {
      return generatePath(node.parent) + ';' + node.id
    }
    return node.id
  }
}

function verifyNode(id, node) {
  if (node.id == id) {
    return node
  } else {
    for (var i = 0; node.children.length; i++) {
      var result = verifyNode(id, node.children[i])
      if (result) {
        return result
      }
    }
    return null
  }
}

function verifySubstring(paths){
  if(paths.length > 1){
    var leftInRight = paths[0].indexOf(paths[1]) > -1
    var RightInLeft = paths[1].indexOf(paths[0]) > -1
    if(leftInRight){
      return [paths[0]]
    }else if(RightInLeft){
      return [paths[1]]
    }
  }
  return paths
}

console.log(getPaths("D8"));