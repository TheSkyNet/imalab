
import {adminLayout} from "./Admin/adminLayout";
import {AdminProjectList} from "./Admin/AdminProject";
import {AdminPostList} from "./Admin/AdminPosts";
import {AdminPackageList} from "./Admin/AdminPackage";
import {AdminFileList} from "./Admin/AdminFiles";
import {AdminCodeList} from "./Admin/AdminCode";
import {AdminUserList} from "./Admin/AdminUsers";
import {Auth, LoginList} from "./Login/LoginModule";

require('./ImaLab.js');
var root = document.getElementById('main');
  m.request({
        method: "GET",
        url: "/auth",
        headers: {
            'Accept': `application/json`
        },
        withCredentials: true,
    }
).then(function (result) {
      Object.assign(Auth, result);
      if(Auth.id){
          m.route(root, "/", {
              "/": adminLayout(AdminProjectList),
              "/project": adminLayout(AdminProjectList),
              "/project/:id":adminLayout(AdminProjectList),
              "/post": adminLayout(AdminPostList),
              "/post/:id": adminLayout(AdminPostList),
              "/package": adminLayout(AdminPackageList),
              "/package/:id": adminLayout(AdminPackageList),
              "/code": adminLayout(AdminCodeList),
              "/code/:id": adminLayout(AdminCodeList),
              "/file": adminLayout(AdminFileList),
              "/file/:id": adminLayout(AdminFileList),
              "/user": adminLayout(AdminUserList),
              "/user/:id": adminLayout(AdminUserList),
              "/login": adminLayout(AdminUserList),


          });
      }else {
          m.route(root, "/", {
              "/": LoginList

          });
      }


  })
console.log(Auth)
