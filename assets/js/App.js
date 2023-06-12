import {AllList} from "./All/AllModule";
import {ProjectList, ProjectOne} from "./Project/ProjectModule";
import {PackageList} from "./Package/PackageModule";
import {PostList} from "./Post/PostsModule";
import {About} from "./About/AboutModule";
import {CodeList, CodeOne} from "./Code/CodeModule";
import {LoginList} from "./Login/LoginModule";

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
    "/code": CodeList,
    "/about": About,
    "/login": LoginList
});

function layout(view){
    return view;

}