var Code = {
    list: [],
    current: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/v1/code",
            withCredentials: true,
        })
            .then(function (result) {
                Code.list = result
            })
    }, load: function (id) {
        return m.request({
            method: "GET",
            url: "/api/v1/code/" + id,
            withCredentials: true,
        })
            .then(function (result) {
                Code.current = result
            })
    }
};

var CodeList = {
    oninit: Code.loadList(),
    view: function () {

        return m(".row", Code.list.map(function (code) {
            return m(".grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3", [
                m('a', {class: "card", href: '/#!/' + code.type + '/' + code.id}, [
                        m('div', {class: "card-img-top"},
                            m(
                                'img', {class: "img-fluid", src: code.img}
                            )
                        ),
                        m('.grid-item-title', code.title)
                    ]
                )
            ])
        }))
    }
};

var CodeOne = {
    loading:true,
    oninit: function (vnode) {
        Code.load(vnode.attrs.id).then(() => {
            CodeOne.loading = false
        })
    },
    view: function () {
        if (CodeOne.loading) {
            return 'loading'

        }
        return m(".embed-responsive .embed-responsive-1by1 ", [
            m("iframe", {
                "id": "iframeResult",
                "name": "iframeResult",
                "allowfullscreen": "allowfullscreen",
                "frameborder": "0",
                src: `/api/v1/code/${Code.current.id}/html`
            })
        ])
    },
    onupdate: function () {

    }
};
module.exports = {CodeList, CodeOne, Code}
