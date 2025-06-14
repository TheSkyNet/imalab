const EasyMDE = require("easymde");

var AdminProject = {
    list: [],
    project: {
        title: '',
        img: '',
        body: '',
    },

    current: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/v1/project",
            withCredentials: true,
        })
            .then(function (result) {
                AdminProject.list = result
            })
    },
    delete(id) {
        return m.request({
                method: "DELETE",
                url: "/api/v1/project/" + id,
                withCredentials: true,
            }
        ).then(function (result) {
            AdminProject.loadList()
        })
    },

    load: function (id) {
        return m.request({
                method: "GET",
                url: "/api/v1/project/" + id,
                withCredentials: true,
            }
        ).then(function (result) {
            AdminProject.project = result
        })
    },
    addProject() {
        return m.request({
                method: "POST",
                url: "/api/v1/project",
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminProject.project,
            }
        ).then(function (result) {
            AdminProject.loadList()
        })
    },
    updateProject(id) {
        return m.request({
                method: "PUT",
                url: "/api/v1/project/" + id,
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminProject.project,
            }
        ).then(function (result) {
            AdminProject.loadList()
        })
    }
};

var AdminProjectList = {
    loading: true,
    oninit: (vnode) => {
        if (vnode.attrs.id) {
            AdminProject.load(vnode.attrs.id).then(() => {
                AdminProjectList.loading = false
            })
            // ;
        }
        AdminProject.loadList().then(() => {
            AdminProjectList.loading = false
        })

    },
    view: function (vnode) {
        console.log(AdminProjectList.loading);
        if (AdminProjectList.loading) {

            return m('div', 'loading');
        }
        return m("div", {"class": "row"},
            [
                m('div', {class: 'col-12'}, m("h1",
                    "Projects"
                )),
                m("div", {class: 'col-6'},
                    m("div", {"class": "form"},
                        m("form", {
                                onsubmit: (e) => {
                                    event.preventDefault();

                                    if (vnode.attrs.id) {
                                        AdminProject.updateProject(vnode.attrs.id)
                                    } else {
                                        AdminProject.addProject()
                                    }

                                }
                            },
                            m("div", {"class": "input-group mb-3"},
                                [
                                    m("input", {
                                        "class": "form-control form-control-lg",
                                        "type": "text",
                                        value: AdminProject.project.title,
                                        onchange: (e) => {
                                            AdminProject.project.title = e.target.value;
                                        },
                                        "placeholder": "title"
                                    }), m("div", {"class": "input-group-append"},
                                    m("span", {"class": "input-group-text", "id": "basic-addon2"},
                                        "Name"
                                    )
                                )
                                ]
                            ),

                            m("div", {"class": "input-group mb-3"},
                                [
                                    m("input", {
                                        "class": "form-control form-control-lg",
                                        "type": "text",
                                        "placeholder": "img",
                                        value: AdminProject.project.img,
                                        onchange: (e) => {
                                            AdminProject.project.img = e.target.value;
                                        },
                                    }), m("div", {"class": "input-group-append"},
                                    m("span", {"class": "input-group-text", "id": "basic-addon2"},
                                        "Img"
                                    )
                                )
                                ]
                            ),
                            m("div", {"class": "form-group"},
                                [
                                    m("label", {"for": "exampleFormControlTextarea1"},
                                        "Example textarea"
                                    ),
                                    m('textarea', {
                                        oncreate: function (vnode) {
                                            AdminProjectList.easyMDE = new EasyMDE({
                                                element: vnode.dom
                                            });
                                            console.log(AdminProject);
                                            AdminProjectList.easyMDE.value(AdminProject.project.body)
                                            AdminProjectList.easyMDE.codemirror.on("change", () => {
                                                AdminProject.project.body = AdminProjectList.easyMDE.value()
                                            });
                                        },

                                    }, AdminProject.project.body)

                                ]
                            ),
                            m("button", {"class": "btn btn-primary btn-lg btn-block", "type": "submit"},
                                "save"
                            )
                        )
                    ),
                ),
                m("div", {class: 'col-6'},

                    m("div", {"class": "container"},
                        m("div", {"class": "row"},
                            m("div", {"class": "col-12"},
                                m("table", {"class": "table table-bordered"},
                                    [
                                        m("thead",
                                            m("tr",
                                                [

                                                    m("th", {"scope": "col"},
                                                        "Article Name"
                                                    ),
                                                    m("th", {"scope": "col"},
                                                        "Actions"
                                                    )
                                                ]
                                            )
                                        ),
                                        m("tbody",
                                            AdminProject.list.map((project) => {
                                                return m("tr",
                                                    [

                                                        m("td",
                                                            project.title
                                                        ),
                                                        m("td",
                                                            [

                                                                m(m.route.Link, {
                                                                        href: `/project/${project.id}`,
                                                                        class: "btn btn-primary",
                                                                        options: {replace: true},
                                                                    },
                                                                    m("i", {"class": "octicon octicon-pencil "})
                                                                ),
                                                                m("button", {
                                                                        "class": "btn btn-danger",
                                                                        "type": "button",
                                                                        onclick: () => {

                                                                            if (confirm("Are You Sure") === true) {
                                                                                AdminProject.delete(project.id)
                                                                            }


                                                                        }
                                                                    },
                                                                    m.trust('&#128465;')
                                                                )
                                                            ]
                                                        )
                                                    ]
                                                )
                                            })
                                        )
                                    ]
                                )
                            )
                        )
                    )
                ),

            ]
        );


    },

};


module.exports = {AdminProjectList, AdminProject}