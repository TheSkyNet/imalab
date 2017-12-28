

var Package = {
  list: [],
  current: [],
  loadList: function () {
    return m.request({
      method: "GET",
      url: "/api/v1/package",
      withCredentials: true,
    })
      .then(function (result) {
        Project.list = result
      })
  }, load: function (id) {
    return m.request({
      method: "GET",
      url: "/api/v1/package/" + id,
      withCredentials: true,
    })
      .then(function (result) {
        Project.current = result
      })
  }
};

var PackageList = {
  oninit: Package.loadList(),
  view: function () {
    return m(".row", Project.list.map(function (project) {
      return m(".grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3", [
        m('a', {class: "card", href: '//' + project.link}, [
            m('.packages-item-title', project.name),
            m('.packages-item-slug', m('pre', {class: 'pre'}, project.slug.trim())),
            m('.grid-item-slug .slug-'+ project.lang.trim(), project.lang.trim())
          ]
        )
      ])
    }))
  }
};
