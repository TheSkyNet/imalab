var AdminPost = {
    list: [],
    post: {
        title: '',
        img: '',
        body: '',
    },

    current: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/v1/post",
            withCredentials: true,
        })
            .then(function (result) {
                AdminPost.list = result
            })
    },
    load: function (id) {
        return m.request({
                method: "GET",
                url: "/api/v1/post/" + id,
                withCredentials: true,
            }
        ).then(function (result) {
            AdminPost.post = result
        })
    },
    delete(id) {
        return m.request({
                method: "DELETE",
                url: "/api/v1/post/" + id,
                withCredentials: true,
            }
        ).then(function (result) {
            AdminPost.loadList()
        })
    },
    addPost() {
        return m.request({
                method: "POST",
                url: "/api/v1/post",
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminPost.post,
            }
        ).then(function (result) {
            AdminPost.loadList()
            //m.route.set("/posts")
        })
    },
    updatePost() {
        return m.request({
                method: "POST",
                url: "/api/v1/post",
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminPost.post,
            }
        ).then(function (result) {
            AdminPost.loadList()
            // m.route.set("/posts")
        })
    }
};

var AdminPostList = {
    oninit: (vnode) => {
        if (vnode.attrs.id) {
            AdminPost.load(vnode.attrs.id)
        }
        AdminPost.loadList()

    },
    view: function (vnode) {
        return m("div", {"class": "row"},
            [
                m('div', {class: 'col-12'}, m("h1",
                    "Posts"
                )),
                m("div", {class: 'col-6'},
                    m("div", {"class": "form"},
                        m("form", {
                                onsubmit: (e) => {
                                    event.preventDefault();
                                    if (vnode.attrs.id) {
                                        AdminPost.updatePost()
                                    } else {
                                        AdminPost.addPost()
                                    }

                                }
                            },
                            m("div", {"class": "input-group mb-3"},
                                [
                                    m("input", {
                                        "class": "form-control form-control-lg",
                                        "type": "text",
                                        value: AdminPost.post.title,
                                        onchange: (e) => {
                                            AdminPost.post.title = e.target.value;
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
                                        value: AdminPost.post.img,
                                        onchange: (e) => {
                                            AdminPost.post.img = e.target.value;
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
                                    m("textarea", {
                                            "class": "form-control",
                                            "id": "exampleFormControlTextarea1",
                                            "rows": "3",
                                            onchange: (e) => {
                                                AdminPost.post.body = e.target.value;
                                            },
                                        },
                                        AdminPost.post.body
                                    )
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
                                            AdminPost.list.map((post) => {
                                                return m("tr",
                                                    [

                                                        m("td",
                                                            post.title
                                                        ),
                                                        m("td",
                                                            [
                                                                m(m.route.Link, {
                                                                        href: `/post/${post.id}`,
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
                                                                                AdminPost.delete(post.id)
                                                                            }
                                                                            return;

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
    }
};


module.exports = {AdminPostList, AdminPost}