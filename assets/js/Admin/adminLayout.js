function adminLayout(view) {
    return {
        view: (vnode) => {
            return [
                m("nav", {"class": "navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0"},
                    [
                        m("a", {"class": "navbar-brand col-sm-3 col-md-2 mr-0", "href": "#"},
                            "Iam Lab"
                        ),
                        m("ul", {"class": "navbar-nav px-3"},
                            m("li", {"class": "nav-item text-nowrap"},
                                m("a", {"class": "nav-link", "href": "#"},
                                    "Sign out"
                                )
                            )
                        )
                    ]
                ),
                m("div", {"class": "container-fluid"},
                    m("div", {"class": "row"},
                        m("nav", {"class": "col-md-2 d-none d-md-block bg-light sidebar"},
                            m("div", {"class": "sidebar-sticky"},
                                [
                                    m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/project",
                                                        options: {replace: true},
                                                    },
                                                    " Products "
                                                )
                                            ),
                                        ]
                                    ),
                                    m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/user",
                                                        options: {replace: true},
                                                    },
                                                    " User "
                                                )
                                            ),
                                        ]
                                    )
                                    ,  m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/code",
                                                        options: {replace: true},
                                                    },
                                                    " Code "
                                                )
                                            ),
                                        ]
                                    ),
                                    m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/file",
                                                        options: {replace: true},
                                                    },
                                                    " File "
                                                )
                                            ),
                                        ]
                                    ),
                                    m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/package",
                                                        options: {replace: true},
                                                    },
                                                    " Package "
                                                )
                                            ),
                                        ]
                                    ),
                                    m("ul", {"class": "nav flex-column"},
                                        [
                                            m("li", {"class": "nav-item"},
                                                m(m.route.Link, {
                                                        "class": "nav-link",
                                                        href: "/post",
                                                        options: {replace: true},
                                                    },
                                                    " Posts "
                                                )
                                            ),
                                        ]
                                    ),

                                ]
                            )
                        ),
                        m("main", {"class": "col-md-9 ml-sm-auto col-lg-10 pt-3 px-4", "role": "main"},
                         m(view , vnode.attrs )
                        )
                    )
                )
            ]
        }
    }
}

module.exports = {adminLayout}

let foo = [
    m("nav", {"class": "col-md-2 d-none d-md-block bg-light sidebar"},
        m("div", {"class": "sidebar-sticky"},
            [
                m("ul", {"class": "nav flex-column"},
                    [
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link active", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-home",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),
                                            m("polyline", {"points": "9 22 9 12 15 12 15 22"})
                                        ]
                                    ),
                                    " Dashboard ",
                                    m("span", {"class": "sr-only"},
                                        "(current)"
                                    )
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-file",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),
                                            m("polyline", {"points": "13 2 13 9 20 9"})
                                        ]
                                    ),
                                    " Orders "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-shopping-cart",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("circle", {"cx": "9", "cy": "21", "r": "1"}),
                                            m("circle", {"cx": "20", "cy": "21", "r": "1"}),
                                            m("path", {"d": "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})
                                        ]
                                    ),
                                    " Products "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-users",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),
                                            m("circle", {"cx": "9", "cy": "7", "r": "4"}),
                                            m("path", {"d": "M23 21v-2a4 4 0 0 0-3-3.87"}),
                                            m("path", {"d": "M16 3.13a4 4 0 0 1 0 7.75"})
                                        ]
                                    ),
                                    " Customers "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-bar-chart-2",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("line", {"x1": "18", "y1": "20", "x2": "18", "y2": "10"}),
                                            m("line", {"x1": "12", "y1": "20", "x2": "12", "y2": "4"}),
                                            m("line", {"x1": "6", "y1": "20", "x2": "6", "y2": "14"})
                                        ]
                                    ),
                                    " Reports "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-layers",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("polygon", {"points": "12 2 2 7 12 12 22 7 12 2"}),
                                            m("polyline", {"points": "2 17 12 22 22 17"}),
                                            m("polyline", {"points": "2 12 12 17 22 12"})
                                        ]
                                    ),
                                    " Integrations "
                                ]
                            )
                        )
                    ]
                ),
                m("h6", {"class": "sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"},
                    [
                        m("span",
                            "Saved reports"
                        ),
                        m("a", {"class": "d-flex align-items-center text-muted", "href": "#"},
                            m("svg", {
                                    "class": "feather feather-plus-circle",
                                    "xmlns": "http://www.w3.org/2000/svg",
                                    "width": "24",
                                    "height": "24",
                                    "viewBox": "0 0 24 24",
                                    "fill": "none",
                                    "stroke": "currentColor",
                                    "stroke-width": "2",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                },
                                [
                                    m("circle", {"cx": "12", "cy": "12", "r": "10"}),
                                    m("line", {"x1": "12", "y1": "8", "x2": "12", "y2": "16"}),
                                    m("line", {"x1": "8", "y1": "12", "x2": "16", "y2": "12"})
                                ]
                            )
                        )
                    ]
                ),
                m("ul", {"class": "nav flex-column mb-2"},
                    [
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-file-text",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),
                                            m("polyline", {"points": "14 2 14 8 20 8"}),
                                            m("line", {"x1": "16", "y1": "13", "x2": "8", "y2": "13"}),
                                            m("line", {"x1": "16", "y1": "17", "x2": "8", "y2": "17"}),
                                            m("polyline", {"points": "10 9 9 9 8 9"})
                                        ]
                                    ),
                                    " Current month "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-file-text",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),
                                            m("polyline", {"points": "14 2 14 8 20 8"}),
                                            m("line", {"x1": "16", "y1": "13", "x2": "8", "y2": "13"}),
                                            m("line", {"x1": "16", "y1": "17", "x2": "8", "y2": "17"}),
                                            m("polyline", {"points": "10 9 9 9 8 9"})
                                        ]
                                    ),
                                    " Last quarter "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-file-text",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),
                                            m("polyline", {"points": "14 2 14 8 20 8"}),
                                            m("line", {"x1": "16", "y1": "13", "x2": "8", "y2": "13"}),
                                            m("line", {"x1": "16", "y1": "17", "x2": "8", "y2": "17"}),
                                            m("polyline", {"points": "10 9 9 9 8 9"})
                                        ]
                                    ),
                                    " Social engagement "
                                ]
                            )
                        ),
                        m("li", {"class": "nav-item"},
                            m("a", {"class": "nav-link", "href": "#"},
                                [
                                    m("svg", {
                                            "class": "feather feather-file-text",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("path", {"d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),
                                            m("polyline", {"points": "14 2 14 8 20 8"}),
                                            m("line", {"x1": "16", "y1": "13", "x2": "8", "y2": "13"}),
                                            m("line", {"x1": "16", "y1": "17", "x2": "8", "y2": "17"}),
                                            m("polyline", {"points": "10 9 9 9 8 9"})
                                        ]
                                    ),
                                    " Year-end sale "
                                ]
                            )
                        )
                    ]
                )
            ]
        )
    ),
    m("main", {"class": "col-md-9 ml-sm-auto col-lg-10 pt-3 px-4", "role": "main"},
        [
            m("div", {
                    "class": "chartjs-size-monitor",
                    "style": {
                        "position": "absolute",
                        "inset": "0px",
                        "overflow": "hidden",
                        "pointer-events": "none",
                        "visibility": "hidden",
                        "z-index": "-1"
                    }
                },
                [
                    m("div", {
                            "class": "chartjs-size-monitor-expand",
                            "style": {
                                "position": "absolute",
                                "left": "0",
                                "top": "0",
                                "right": "0",
                                "bottom": "0",
                                "overflow": "hidden",
                                "pointer-events": "none",
                                "visibility": "hidden",
                                "z-index": "-1"
                            }
                        },
                        m("div", {
                            "style": {
                                "position": "absolute",
                                "width": "1000000px",
                                "height": "1000000px",
                                "left": "0",
                                "top": "0"
                            }
                        })
                    ),
                    m("div", {
                            "class": "chartjs-size-monitor-shrink",
                            "style": {
                                "position": "absolute",
                                "left": "0",
                                "top": "0",
                                "right": "0",
                                "bottom": "0",
                                "overflow": "hidden",
                                "pointer-events": "none",
                                "visibility": "hidden",
                                "z-index": "-1"
                            }
                        },
                        m("div", {
                            "style": {
                                "position": "absolute",
                                "width": "200%",
                                "height": "200%",
                                "left": "0",
                                "top": "0"
                            }
                        })
                    )
                ]
            ),
            m("div", {"class": "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"},
                [
                    m("h1", {"class": "h2"},
                        "Dashboard"
                    ),
                    m("div", {"class": "btn-toolbar mb-2 mb-md-0"},
                        [
                            m("div", {"class": "btn-group mr-2"},
                                [
                                    m("button", {"class": "btn btn-sm btn-outline-secondary"},
                                        "Share"
                                    ),
                                    m("button", {"class": "btn btn-sm btn-outline-secondary"},
                                        "Export"
                                    )
                                ]
                            ),
                            m("button", {"class": "btn btn-sm btn-outline-secondary dropdown-toggle"},
                                [
                                    m("svg", {
                                            "class": "feather feather-calendar",
                                            "xmlns": "http://www.w3.org/2000/svg",
                                            "width": "24",
                                            "height": "24",
                                            "viewBox": "0 0 24 24",
                                            "fill": "none",
                                            "stroke": "currentColor",
                                            "stroke-width": "2",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                        },
                                        [
                                            m("rect", {
                                                "x": "3",
                                                "y": "4",
                                                "width": "18",
                                                "height": "18",
                                                "rx": "2",
                                                "ry": "2"
                                            }),
                                            m("line", {"x1": "16", "y1": "2", "x2": "16", "y2": "6"}),
                                            m("line", {"x1": "8", "y1": "2", "x2": "8", "y2": "6"}),
                                            m("line", {"x1": "3", "y1": "10", "x2": "21", "y2": "10"})
                                        ]
                                    ),
                                    " This week "
                                ]
                            )
                        ]
                    )
                ]
            ),
            m("canvas", {
                "class": "my-4 chartjs-render-monitor",
                "id": "myChart",
                "width": "391",
                "height": "165",
                "style": {"display": "block", "width": "391px", "height": "165px"}
            }),
            m("h2",
                "Section title"
            ),
            m("div", {"class": "table-responsive"},
                m("table", {"class": "table table-striped table-sm"},
                    [
                        m("thead",
                            m("tr",
                                [
                                    m("th",
                                        "#"
                                    ),
                                    m("th",
                                        "Header"
                                    ),
                                    m("th",
                                        "Header"
                                    ),
                                    m("th",
                                        "Header"
                                    ),
                                    m("th",
                                        "Header"
                                    )
                                ]
                            )
                        ),
                        m("tbody",
                            [
                                m("tr",
                                    [
                                        m("td",
                                            "1,001"
                                        ),
                                        m("td",
                                            "Lorem"
                                        ),
                                        m("td",
                                            "ipsum"
                                        ),
                                        m("td",
                                            "dolor"
                                        ),
                                        m("td",
                                            "sit"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,002"
                                        ),
                                        m("td",
                                            "amet"
                                        ),
                                        m("td",
                                            "consectetur"
                                        ),
                                        m("td",
                                            "adipiscing"
                                        ),
                                        m("td",
                                            "elit"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,003"
                                        ),
                                        m("td",
                                            "Integer"
                                        ),
                                        m("td",
                                            "nec"
                                        ),
                                        m("td",
                                            "odio"
                                        ),
                                        m("td",
                                            "Praesent"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,003"
                                        ),
                                        m("td",
                                            "libero"
                                        ),
                                        m("td",
                                            "Sed"
                                        ),
                                        m("td",
                                            "cursus"
                                        ),
                                        m("td",
                                            "ante"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,004"
                                        ),
                                        m("td",
                                            "dapibus"
                                        ),
                                        m("td",
                                            "diam"
                                        ),
                                        m("td",
                                            "Sed"
                                        ),
                                        m("td",
                                            "nisi"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,005"
                                        ),
                                        m("td",
                                            "Nulla"
                                        ),
                                        m("td",
                                            "quis"
                                        ),
                                        m("td",
                                            "sem"
                                        ),
                                        m("td",
                                            "at"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,006"
                                        ),
                                        m("td",
                                            "nibh"
                                        ),
                                        m("td",
                                            "elementum"
                                        ),
                                        m("td",
                                            "imperdiet"
                                        ),
                                        m("td",
                                            "Duis"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,007"
                                        ),
                                        m("td",
                                            "sagittis"
                                        ),
                                        m("td",
                                            "ipsum"
                                        ),
                                        m("td",
                                            "Praesent"
                                        ),
                                        m("td",
                                            "mauris"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,008"
                                        ),
                                        m("td",
                                            "Fusce"
                                        ),
                                        m("td",
                                            "nec"
                                        ),
                                        m("td",
                                            "tellus"
                                        ),
                                        m("td",
                                            "sed"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,009"
                                        ),
                                        m("td",
                                            "augue"
                                        ),
                                        m("td",
                                            "semper"
                                        ),
                                        m("td",
                                            "porta"
                                        ),
                                        m("td",
                                            "Mauris"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,010"
                                        ),
                                        m("td",
                                            "massa"
                                        ),
                                        m("td",
                                            "Vestibulum"
                                        ),
                                        m("td",
                                            "lacinia"
                                        ),
                                        m("td",
                                            "arcu"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,011"
                                        ),
                                        m("td",
                                            "eget"
                                        ),
                                        m("td",
                                            "nulla"
                                        ),
                                        m("td",
                                            "Class"
                                        ),
                                        m("td",
                                            "aptent"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,012"
                                        ),
                                        m("td",
                                            "taciti"
                                        ),
                                        m("td",
                                            "sociosqu"
                                        ),
                                        m("td",
                                            "ad"
                                        ),
                                        m("td",
                                            "litora"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,013"
                                        ),
                                        m("td",
                                            "torquent"
                                        ),
                                        m("td",
                                            "per"
                                        ),
                                        m("td",
                                            "conubia"
                                        ),
                                        m("td",
                                            "nostra"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,014"
                                        ),
                                        m("td",
                                            "per"
                                        ),
                                        m("td",
                                            "inceptos"
                                        ),
                                        m("td",
                                            "himenaeos"
                                        ),
                                        m("td",
                                            "Curabitur"
                                        )
                                    ]
                                ),
                                m("tr",
                                    [
                                        m("td",
                                            "1,015"
                                        ),
                                        m("td",
                                            "sodales"
                                        ),
                                        m("td",
                                            "ligula"
                                        ),
                                        m("td",
                                            "in"
                                        ),
                                        m("td",
                                            "libero"
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                )
            )
        ]
    )
]