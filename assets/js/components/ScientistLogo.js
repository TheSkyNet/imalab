// ScientistLogo.js
const ScientistLogo = {
    view: function() {
        return m("div.scientist-logo", {
            style: {
                width: "200px",
                height: "50px"
            }
        }, [
            m("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 400 100",
                style: {
                    width: "100%",
                    height: "100%"
                }
            }, [
                // Lab table
                m("rect.lab-table", {
                    x: "50",
                    y: "70",
                    width: "300",
                    height: "10",
                    fill: "#8198c4",
                    stroke: "#fff"
                }),

                // Bunsen burner
                m("g.bunsen-burner", {
                    transform: "translate(100, 45)"
                }, [
                    m("rect", {
                        x: "0",
                        y: "0",
                        width: "20",
                        height: "25",
                        fill: "#666"
                    }),
                    m("path.flame", {
                        d: "M5,0 Q10,-10 15,0",
                        stroke: "#ff6b6b",
                        fill: "none",
                        "stroke-width": "2",
                        class: "animate-flame"
                    })
                ]),

                // Beaker 1 (stationary)
                m("g.beaker1", {
                    transform: "translate(150, 35)"
                }, [
                    m("path", {
                        d: "M0,0 L5,35 L25,35 L30,0 Z",
                        fill: "rgba(129, 152, 196, 0.3)",
                        stroke: "#fff"
                    }),
                    m("path.liquid1", {
                        d: "M5,20 L25,20",
                        stroke: "#ff6b6b",
                        "stroke-width": "15",
                        class: "animate-liquid"
                    })
                ]),

                // Scientist
                m("g.scientist", {
                    transform: "translate(200, 20)"
                }, [
                    // Head
                    m("circle", {
                        cx: "0",
                        y: "0",
                        r: "10",
                        fill: "#fff"
                    }),
                    // Body
                    m("line", {
                        x1: "0",
                        y1: "10",
                        x2: "0",
                        y2: "30",
                        stroke: "#fff",
                        "stroke-width": "2"
                    }),
                    // Arms (animated)
                    m("path.arm-left", {
                        d: "M0,15 L-15,25",
                        stroke: "#fff",
                        "stroke-width": "2",
                        class: "animate-pour"
                    }),
                    m("path.arm-right", {
                        d: "M0,15 L15,25",
                        stroke: "#fff",
                        "stroke-width": "2",
                        class: "animate-pour"
                    }),
                    // Beaker in hands (animated)
                    m("path.beaker-pouring", {
                        d: "M10,20 L15,40 L25,40 L30,20 Z",
                        fill: "rgba(129, 152, 196, 0.3)",
                        stroke: "#fff",
                        class: "animate-pour"
                    }),
                    // Liquid pouring (animated)
                    m("path.liquid-stream", {
                        d: "M20,40 C20,50 30,60 30,70",
                        stroke: "#ff6b6b",
                        "stroke-width": "2",
                        fill: "none",
                        class: "animate-pour-liquid"
                    })
                ])
            ]),
            m("style", `
                @keyframes flame {
                    0% { transform: scaleY(1); }
                    50% { transform: scaleY(1.2); }
                    100% { transform: scaleY(1); }
                }
                @keyframes liquid {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(2px); }
                    100% { transform: translateY(0); }
                }
                @keyframes pour {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(30deg); }
                    100% { transform: rotate(0deg); }
                }
                @keyframes pourLiquid {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
                .animate-flame {
                    animation: flame 1s infinite ease-in-out;
                    transform-origin: center bottom;
                }
                .animate-liquid {
                    animation: liquid 2s infinite ease-in-out;
                }
                .animate-pour {
                    animation: pour 4s infinite ease-in-out;
                    transform-origin: 0 15;
                }
                .animate-pour-liquid {
                    animation: pourLiquid 4s infinite ease-in-out;
                }
            `)
        ]);
    }
};

module.exports = ScientistLogo;