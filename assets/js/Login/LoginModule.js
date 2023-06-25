var Login = {
    list: [],
    current: [],
    user: {
        email:'',
        password:'',
    },

    login: function () {
        return m.request({
                method: "POST",
                url: "/auth",
                withCredentials: true,
            body: Login.user,
            }
        ).then(function (result) {

            Object.assign(Auth, result);

             window.location.reload();


           // Login.current = result
        })
    }
};
let Auth ={}

var LoginList = {
    view: function () {

        return m("div", {"class": "container-fluid main login", "id": "main"},
            m("div", {"class": "row vertical-offset-100"},
                [
                    m("div", {"class": "col-sm-4 "},
                    ),
                    m("div", {"class": "col-sm-4 "},
                        m("div", {"class": "panel panel-default"},
                            [
                                m("div", {"class": "panel-heading"},
                                    m("h3", {"class": "panel-title"},
                                        "Please sign in"
                                    )
                                ),
                                m("div", {"class": "panel-body"},
                                    m("form", {"accept-charset": "UTF-8", "role": "form",   onsubmit:()=>{
                                        Login.login()
                                            return false

                                            } },
                                        m("fieldset",
                                            [
                                                m("div", {"class": "form-group"},
                                                    [
                                                        m("input", {
                                                            "class": "form-control",
                                                            "placeholder": "E-mail",
                                                            "name": "email",
                                                            "type": "text",
                                                            value: Login.user.email,
                                                            onchange: (e) => {
                                                                Login.user.email = e.target.value;
                                                            },
                                                        }),
                                                        m("div", {
                                                            "data-lastpass-icon-root": "true",
                                                            "style": {
                                                                "position": "relative !important",
                                                                "height": "0px !important",
                                                                "width": "0px !important",
                                                                "float": "left !important"
                                                            }
                                                        })
                                                    ]
                                                ),
                                                m("div", {"class": "form-group"},
                                                    [
                                                        m("input", {
                                                            "class": "form-control",
                                                            "placeholder": "Password",
                                                            "name": "password",
                                                            "type": "password",
                                                            value: Login.user.password,
                                                            onchange: (e) => {
                                                                Login.user.password = e.target.value;
                                                            },

                                                        }),
                                                        m("div", {
                                                            "data-lastpass-icon-root": "true",
                                                            "style": {
                                                                "position": "relative !important",
                                                                "height": "0px !important",
                                                                "width": "0px !important",
                                                                "float": "left !important"
                                                            }
                                                        })
                                                    ]
                                                ),
                                                m("div", {"class": "checkbox"},
                                                    m("label",
                                                        [
                                                            m("input", {
                                                                "name": "remember",
                                                                "type": "checkbox",
                                                                "value": "Remember Me"
                                                            }),
                                                            " Remember Me "
                                                        ]
                                                    )
                                                ),
                                                m("input", {
                                                    "class": "btn btn-lg btn-success btn-block",
                                                    "type": "submit",
                                                    "value": "Login"
                                                })
                                            ]
                                        )
                                    )
                                )
                            ]
                        )
                    )
                ]
            )
        )
    },

};


module.exports = {LoginList, Login ,Auth}