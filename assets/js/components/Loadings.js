// Loading component
const Loadings = {
    view:  function (){
        return m("div.loading-spinner", {
            style: {
                textAlign: 'center',
                padding: '3rem',
                color: '#fff'
            }
        }, [
            m("i.octicon.octicon-sync", {
                style: {
                    fontSize: '2rem',
                    animation: 'spin 1s linear infinite'
                }
            }),
            m("p", "Loading projects...")
        ]);

    }
};



export default Loadings;