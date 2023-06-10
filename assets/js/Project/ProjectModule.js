var Project = {
    list: [],
    current: {
        id: '',
        img: '',
        title: '',
        body: '',
        type: '',
    },
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/v1/project",
            withCredentials: true,
        })
            .then(function (result) {
                Project.list = result
            })
    }, load: function (id) {
        return m.request({
            method: "GET",
            url: "/api/v1/project/" + id,
            withCredentials: true,
        })
            .then(function (result) {
                Project.current = result
            })
    }
};

var ProjectOne = {
    oninit: function (vnode) {
        Project.load(vnode.attrs.id)
    },
    view: function () {
        var md = markdown.toHTML(Project.current.body);

        return m(".container .post-container", [
            m('div', {class: "card post"},
                m('', [
                        m('div', {class: "col"},
                            m('div', {id: '', class: "post-img-top"},
                                m(
                                    'img', {id: 'thing_img', class: "img-fluid", src: Project.current.img}
                                ),
                                m('.grid-item-slug .slug-' + Project.current.type.trim(), Project.current.type.trim())
                            ),
                            m('.post-title', m('.h1', Project.current.title)),
                            m('.post-block', m('.post-section', m.trust(md)))
                        ),
                    ]
                ))
        ])
    },
    onupdate: function () {

    }
};

var ProjectList = {
    oninit: Project.loadList(),
    view: function () {
        return m(".row .grid", Project.list.map(function (project) {
            return m(".grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3", [
                m('a', {class: "card", href: '/#!/' + project.type + '/' + project.id}, [
                        m('div', {class: "card-img-top"},
                            m(
                                'img', {class: "img-fluid", src: project.img}
                            )
                        ),
                        /* m('.grid-item-title', project.title),*/
                        m('.grid-item-slug .slug-' + project.type.trim(), project.type.trim())
                    ]
                )
            ])
        }))
    },
    onupdate: function (vnode) {
        var $grid = $('.grid');
        $grid.imagesLoaded().progress(function () {
            $grid.masonry({
                columnWidth: '.grid-item',
                itemSelector: '.grid-item',
                percentPosition: true
            });

            // bind event
            $grid.masonry('on', 'layoutComplete', function () {
                /*
                        console.log('layout is complete')
                */
            });
        });

    },
    oncreate: function (vnode) {
        var $grid = $('.grid');
        $grid.imagesLoaded().progress(function () {
            $grid.masonry({
                columnWidth: '.grid-item',
                itemSelector: '.grid-item',
                percentPosition: true
            });

            // bind event
            $grid.masonry('on', 'layoutComplete', function () {
                /*
                        console.log('layout is complete')
                */
            });
        });
    },
};


module.exports = {ProjectList, Project, ProjectOne}

