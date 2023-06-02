


var AdminFile = {
    list: [],
    file: {
        name: '',
        link: '',
        body: '',
    },

    current: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/v1/file",
            withCredentials: true,
        })
            .then(function (result) {
                AdminFile.list = result
            })
    },
    load: function (id) {
        return m.request({
                method: "GET",
                url: "/api/v1/file/" + id,
                withCredentials: true,
            }
        ).then(function (result) {
      //      AdminFile.file = result
        })
    },
    addFile() {
        return m.request({
                method: "POST",
                url: "/api/v1/file",
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminFile.file,
            }
        ).then(function (result) {
            AdminFile.loadList()
        })
    },
    updateFile() {
        return m.request({
                method: "POST",
                url: "/api/v1/file",
                headers: {
                    'X-CSRF-Token': this.CSRF,
                    'Accept': `application/json`
                },
                withCredentials: true,
                body: AdminFile.file,
            }
        ).then(function (result) {
            AdminFile.loadList()
        })
    }
};
var AdminFileList = {
    oninit: (vnode) => {
        if (vnode.attrs.id) {
            AdminFile.load(vnode.attrs.id)
        }
        AdminFile.loadList()

    },
    view: function (vnode) {
        return m("div", {"class": "row"},
            [
                m('div', {class: 'col-12'}, m("h1",
                    "Files"
                )),
                m("div", {class: 'col-6'},
                    m('div',
                        {
                            oncreate: (vnode) => {
                                const pond = FilePond.create({
                                    multiple: false,
                                    name: 'filepond',
                                    server: {
                                        url: '/file',
                                        /* process: '/process',
                                         revert: '/process',
                                         patch: "?patch=",
                                         /!* headers: {
                                              'X-CSRF-TOKEN': '{{ csrf_token() }}'
                                          }*!/*/
                                    },
                                    chunkUploads: true
                                });
                                pond.on('processfile', (error, file) => {
                                    if (error) {
                                        console.log('Oh no');
                                        return;
                                    }
                                    this.media.title = file.file.name
                                    this.media.file = file.serverId
                                    console.log('File added', file);
                                    console.log('File added', this.media);
                                });

// Add it to the DOM
                                vnode.dom.appendChild(pond.element);
                            }
                        }
                    ),
                    m("button", {
                            "class": "btn", onclick: () => {
                                this.mediaService.newMedia(this.media)
                            }
                        },
                        "Save"
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
                                                        "File Name"
                                                    ),
                                                    m("th", {"scope": "col"},
                                                        "Actions"
                                                    )
                                                ]
                                            )
                                        ),
                                        m("tbody",
                                            AdminFile.list.map((file) => {
                                                console.log(file, 'E')
                                                return m("tr",
                                                    [

                                                        m("td",
                                                            file.name
                                                        ),
                                                        m("td",
                                                            [
                                                                m(m.route.Link, {
                                                                        href: `/file/${file.id}`,
                                                                        class: "btn btn-primary",
                                                                        options: {replace: true},
                                                                    },
                                                                    m("i", {"class": "octicon octicon-eye"})
                                                                ),

                                                                m("button", {
                                                                        "class": "btn btn-success",
                                                                        "type": "button"
                                                                    },
                                                                    m("i", {"class": "octicon octicon-pencil "})
                                                                ),
                                                                m("button", {
                                                                        "class": "btn btn-danger",
                                                                        "type": "button"
                                                                    },
                                                                    m("i", {"class": "octicon octicon-trash"})
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
    oncreate: function (vnode) {

        //$grid.masonry('layout');

// trigger initial layout
        //  $grid.masonry();
    },
    onupdate: function (vnode) {

    }
};


module.exports = {AdminFileList, AdminFile}