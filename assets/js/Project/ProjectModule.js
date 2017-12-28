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
        console.log(result);
        Project.current = result
      })
  }
};

var ProjectOne  = {
  oninit: function(vnode) {
    console.log('1st0;');
    Project.load(vnode.attrs.id)
  },
  view: function () {
    var md = markdown.toHTML( Project.current.body );

    return m(".container", [
      m('div', {class: "card"},m('.row', [
        m('div', {class: "col-xs-7"},
          m('.h1', Project.current.title),
          m('.card-block', m.trust(md))
        ),
          m('div', {class: "col-xs-5"},
            m(
              'img', {class: "img-fluid", src: Project.current.img}
            ),
            m('.grid-item-slug .slug-'+ Project.current.type.trim(), Project.current.type.trim())
          ),
        ]
      ))
    ])
  }
};

var ProjectList = {
  oninit: Project.loadList(),
  view: function () {
    return m(".row", Project.list.map(function (project) {
      return m(".grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3", [
        m('a', {class: "card", href: '/#!/' + project.type + '/' + project.id}, [
            m('div', {class: "card-img-top"},
              m(
                'img', {class: "img-fluid", src: project.img}
              )
            ),
            m('.grid-item-title', project.title),
            m('.grid-item-slug .slug-'+ project.type.trim(), project.type.trim())
          ]
        )
      ])
    }))
  }
};

