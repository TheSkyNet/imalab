var root = document.getElementById('main');


m.route(root, "/", {
  "/": AllList,
  "/projects": ProjectList,
  "/project/:id": ProjectOne,
  "/packages": PackageList,
  "/packages/:id": PackageList,
  "/posts": PostList,
  "/posts/:id": ProjectList,
  "/about": About
});