import {AllList} from "./All/AllModule";
import {ProjectList, ProjectOne} from "./Project/ProjectModule";
import {PackageList} from "./Package/PackageModule";
import {PostList} from "./Post/PostsModule";
import {About} from "./About/AboutModule";

require('./ImaLab.js');
var root = document.getElementById('main');


m.route(root, "/", {
    "/": AllList,
    "/projects": ProjectList,
    "/project/:id": ProjectOne,
    "/packages": PackageList,
    "/posts": PostList,
    "/posts/:id": ProjectList,
    "/about": About
});