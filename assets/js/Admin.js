
import {adminLayout} from "./Admin/adminLayout";
import {AdminProjectList} from "./Admin/AdminProject";
import {AdminPostList} from "./Admin/AdminPosts";
import {AdminPackageList} from "./Admin/AdminPackage";
import {AdminFileList} from "./Admin/AdminFiles";

require('./ImaLab.js');
var root = document.getElementById('main');

m.route(root, "/", {
    "/": adminLayout(AdminProjectList),
    "/project": adminLayout(AdminProjectList),
    "/project/:id":adminLayout(AdminProjectList),
    "/post": adminLayout(AdminPostList),
    "/post/:id": adminLayout(AdminPostList),
    "/package": adminLayout(AdminPackageList),
    "/package/:id": adminLayout(AdminPackageList),
    "/file": adminLayout(AdminFileList),
    "/file/:id": adminLayout(AdminFileList),
/*    "/package": AdminPackageList,
    "/package/:id": AdminPackageOne,
    "/post": AdminPostList,
    "/about": AdminAbout,
    "/admin": Admin,
    "/admin/:id": AdminOne,*/


});