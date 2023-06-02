import {AllList} from "./All/AllModule";
import {ProjectList, ProjectOne} from "./Project/ProjectModule";
import {PackageList} from "./Package/PackageModule";
import {PostList} from "./Post/PostsModule";
import {About} from "./About/AboutModule";

require('./ImaLab.js');
var root = document.getElementById('main');


m.route(root, "/", {
    "/": layout(AllList),
    "/projects": ProjectList,
    "/project/:key": ProjectOne,
    "/packages": PackageList,
    "/posts": PostList,
    "/posts/:id": ProjectList,
    "/about": About
});

function layout(view){
    return view;

}