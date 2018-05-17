var root = document.getElementById('main');


m.route(root, "/", {
  "/": AllList,
  "/projects": ProjectList,
  "/project/:id": ProjectOne,
  "/packages": PackageList,
  "/posts": PostList,
  "/posts/:id": ProjectList,
  "/about": AboutModule
});