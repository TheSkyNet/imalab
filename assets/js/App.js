import {AllList} from "./All/AllModule";
import {ProjectList, ProjectOne} from "./Project/ProjectModule";
import {PackageList} from "./Package/PackageModule";
import {PostList} from "./Post/PostsModule";
import {About} from "./About/AboutModule";
import {CodeOne} from "./Code/CodeModule";

require('./ImaLab.js');
var root = document.getElementById('main');


m.route(root, "/", {
    "/": layout(AllList),
    "/projects": ProjectList,
    "/project/:key": ProjectOne,
    "/packages": PackageList,
    "/posts": PostList,
    "/posts/:id": ProjectList,
    "/code/:id": CodeOne,
    "/about": About
});

function layout(view){
    return view;

}