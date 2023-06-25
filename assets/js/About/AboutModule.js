var About = {
    list: [],
    current: [],

    load: function () {
        return m.request({
                method: "GET",
                url: "/files/cv.md",
                withCredentials: true,
                deserialize: function (value) {
                    return value
                }

            }
        ).then(function (result) {
            About.current = result
        })
    }
};

var AboutModule = {
   // oninit: About.load(),
    view: function () {
       // var md = markdown.toHTML(About.current);

        return m("div", {class: 'container card '}, [

            m('a', {
                class: 'btn btn-info btn-download float-right',
                href: 'http://iamlab.tech/files/Kevin-Morton-CV.pdf'
            }, 'download my cv'),
            m('.card-block', m.trust('md')),
        ]);
    }
};
module.exports = {About}