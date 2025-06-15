const AdminSettings = {
    loading: false,
    view: function() {
        return m("div.settings-page", {
            style: {
                background: '#fff',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }
        }, [
            // Header
            m("div.header", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }
            }, [
                m("h1", {
                    style: {
                        color: '#9BA5D0', // Pastel blue
                        fontSize: '2rem',
                        margin: 0
                    }
                }, [
                    m("i.octicon.octicon-gear", {
                        style: { marginRight: '0.75rem' }
                    }),
                    "Settings"
                ])
            ]),

            // Content container with pastel background
            m("div.settings-container", {
                style: {
                    background: '#F8F9FE', // Very light pastel blue
                    borderRadius: '6px',
                    padding: '2rem',
                    border: '1px solid #E6E9F4' // Light pastel border
                }
            }, [
                m("div.row", [
                    m("div.col-12", {
                        style: {
                            textAlign: 'center',
                            color: '#9BA5D0'
                        }
                    }, [
                        "Settings content will be added here"
                    ])
                ])
            ])
        ]);
    }
};

module.exports = { AdminSettings };