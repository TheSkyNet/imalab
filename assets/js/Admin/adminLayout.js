function adminLayout(view) {
    return {
        view: (vnode) => {
            return [
                // Top navigation
                m("nav.navbar.sticky-top.shadow-sm", {
                    style: {
                        background: '#8198c4',
                        padding: '0.75rem'
                    }
                }, [
                    m("a.navbar-brand.text-white.font-weight-bold", {
                        href: "#",
                        style: { fontSize: '1.4rem' }
                    }, [
                        m("i.octicon.octicon-beaker", { style: { marginRight: '0.5rem' } }),
                        "IAM Lab"
                    ]),
                    m("ul.navbar-nav.px-3",
                        m("li.nav-item",
                            m("a.nav-link.text-white", { href: "#" }, [
                                m("i.octicon.octicon-sign-out"),
                                " Sign out"
                            ])
                        )
                    )
                ]),

                // Main container
                m("div.container-fluid", {
                        style: { background: '#8198c4',}
                    },
                    m("div.row", [
                        // Sidebar with #8198c4 background
                        m("nav.col-md-2.d-none.d-md-block.sidebar", {
                                style: {
                                    background: '#8198c4',
                                    minHeight: 'calc(100vh - 56px)',
                                    padding: '1.5rem 0'
                                }
                            },
                            m("div.sidebar-sticky", [
                                m("ul.nav.flex-column", {
                                    style: { gap: '0.25rem' }
                                }, [
                                    navItem("/project", "Projects", "octicon-package"),
                                    navItem("/user", "Users", "octicon-person"),
                                    navItem("/code", "Code", "octicon-code"),
                                    navItem("/file", "Files", "octicon-file"),
                                    navItem("/package", "Packages", "octicon-archive"),
                                    navItem("/post", "Posts", "octicon-react")
                                ])
                            ])
                        ),

                        // Main content
                        m("main.col-md-9.ml-sm-auto.col-lg-10", {
                                role: "main",
                                style: {
                                    padding: '2rem',
                                    background: '#8198c4',
                                    minHeight: 'calc(100vh - 56px)'
                                }
                            },
                            m(view, vnode.attrs)
                        )
                    ])
                )
            ]
        }
    }
}

// Helper function for nav items using octicons
function navItem(href, text, icon) {
    return m("li.nav-item",
        m(m.route.Link, {
            class: "nav-link",
            href: href,
            style: {
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s',
                ':hover': {
                    background: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }, [
            m("i.octicon", {
                class: icon,
                style: {
                    fontSize: '16px'
                }
            }),
            text
        ])
    )
}

module.exports = { adminLayout }