// ScientistLogo.js
const ScientistLogo = {
    oninit: function() {
        this.state = {
            scientistX: 100,
            direction: 1,
            walkPhase: 0,
            catVisible: false,
            currentAction: 'walk',
            beakers: [
                { id: 1, x: 200, color: '#ffb3b3', filled: true }, // Pastel pink
                { id: 2, x: 350, color: '#b8e6b8', filled: true }, // Mint green
                { id: 3, x: 500, color: '#b3d9ff', filled: true }, // Baby blue
                { id: 4, x: 650, color: null, filled: false }      // Mixing beaker
            ],
            heldBeaker: null,
            bunsenX: 800
        };
    },
    oncreate: function() {
        this.startAnimation();
        // Random cat appearances
        this.catInterval = setInterval(() => {
            this.state.catVisible = Math.random() < 0.3;
            m.redraw();
        }, 6000);
    },

    onremove: function() {
        clearInterval(this.catInterval);
        cancelAnimationFrame(this.animationFrame);
    },

    startAnimation: function() {
        const animate = () => {
            if (this.state.currentAction === 'walk') {
                this.state.walkPhase = (this.state.walkPhase + 0.15) % (2 * Math.PI);
                this.state.scientistX += 2 * this.state.direction;

                // Check boundaries and reverse direction
                if (this.state.scientistX > 900 || this.state.scientistX < 100) {
                    this.state.direction *= -1;
                }

                // Check for interactions
                this.checkInteractions();
            }
            m.redraw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    },

    checkInteractions: function() {
        // Check beakers
        const nearestBeaker = this.state.beakers.find(b =>
            Math.abs(this.state.scientistX - b.x) < 15
        );

        if (nearestBeaker) {
            this.state.currentAction = 'interact';
            setTimeout(() => this.handleBeakerInteraction(nearestBeaker), 1000);
            return;
        }

        // Check Bunsen burner
        if (Math.abs(this.state.scientistX - this.state.bunsenX) < 15) {
            this.state.currentAction = 'heat';
            setTimeout(() => {
                if (this.state.heldBeaker) {
                    // Darken the color when heated
                    this.state.heldBeaker.color = this.darkenColor(this.state.heldBeaker.color);
                }
                this.state.currentAction = 'walk';
            }, 2000);
        }
    },

    handleBeakerInteraction: function(beaker) {
        if (!this.state.heldBeaker && beaker.filled) {
            // Pick up beaker
            this.state.heldBeaker = { ...beaker };
            beaker.filled = false;
        } else if (this.state.heldBeaker && !beaker.filled) {
            // Pour into empty beaker
            beaker.filled = true;
            beaker.color = this.state.heldBeaker.color;
            this.state.heldBeaker = null;
        }
        setTimeout(() => {
            this.state.currentAction = 'walk';
        }, 1000);
    },

    darkenColor: function(color) {
        const factor = 0.8; // Darken by 20%
        const r = Math.floor(parseInt(color.slice(1,3), 16) * factor).toString(16).padStart(2, '0');
        const g = Math.floor(parseInt(color.slice(3,5), 16) * factor).toString(16).padStart(2, '0');
        const b = Math.floor(parseInt(color.slice(5,7), 16) * factor).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    },

    mixColors: function(color1, color2) {
        const mix = (a, b) => Math.floor((parseInt(a, 16) + parseInt(b, 16)) / 2);
        const r = mix(color1.slice(1,3), color2.slice(1,3));
        const g = mix(color1.slice(3,5), color2.slice(3,5));
        const b = mix(color1.slice(5,7), color2.slice(5,7));
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    },

    view: function() {
        return m("div.scientist-lab", {
            style: { width: "calc(100% - 300px)", height: "50px", margin: "0 20px" }
        }, [
            m("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 1000 60",
                style: { width: "100%", height: "100%" }
            }, [
                // Base line
                m("line", {
                    x1: "50", y1: "50", x2: "950", y2: "50",
                    stroke: "#fff", "stroke-width": "2"
                }),

                // Render all beakers
                ...this.state.beakers.map(this.renderBeaker.bind(this)),

                // Bunsen burner
                this.renderBunsenBurner(),

                // Cat
                this.state.catVisible && this.renderCat(),

                // Scientist
                this.renderScientist(),

                // Held beaker
                this.state.heldBeaker && this.renderHeldBeaker()
            ]),

            // Animations
            m("style", this.getAnimationStyles())
        ]);
    },

    renderScientist: function() {
        const { scientistX, direction, currentAction, walkPhase } = this.state;

        return m("g.scientist", {
            transform: `translate(${scientistX}, 35) scale(${direction}, 1)`
        }, [
            // Head
            m("circle", { cx: 0, cy: 0, r: 5, fill: "#fff" }),
            // Body
            m("line", { x1: 0, y1: 5, x2: 0, y2: 15, stroke: "#fff", "stroke-width": "2" }),
            // Arms
            m("path", {
                d: currentAction === 'interact' || currentAction === 'heat' ?
                    "M0,8 L-8,12 L-5,8 M0,8 L8,12 L5,8" :
                    `M0,8 L${-5 * Math.sin(walkPhase)},12 M0,8 L${5 * Math.sin(walkPhase + Math.PI)},12`,
                stroke: "#fff",
                "stroke-width": "2",
                class: currentAction === 'walk' ? 'walking-arms' : ''
            }),
            // Legs
            m("path", {
                d: currentAction === 'walk' ?
                    `M0,15 L${-5 * Math.sin(walkPhase)},20 M0,15 L${5 * Math.sin(walkPhase + Math.PI)},20` :
                    "M-3,15 L0,20 L3,15",
                stroke: "#fff",
                "stroke-width": "2",
                class: currentAction === 'walk' ? 'walking-legs' : ''
            })
        ]);
    },

    renderBeaker: function(beaker) {
        return m("g.beaker", { transform: `translate(${beaker.x}, 30)` }, [
            // Beaker outline
            m("path", {
                d: "M-8,0 L-6,20 L6,20 L8,0",
                fill: "none",
                stroke: "#fff",
                "stroke-width": "1"
            }),
            // Liquid
            beaker.filled && m("rect", {
                x: -5, y: 5,
                width: 10, height: 14,
                fill: beaker.color,
                opacity: 0.8
            })
        ]);
    },

    renderBunsenBurner: function() {
        return m("g.bunsen", { transform: `translate(${this.state.bunsenX}, 30)` }, [
            // Base
            m("rect", {
                x: -6, y: 0,
                width: 12, height: 20,
                fill: "#666"
            }),
            // Flame
            m("path.flame", {
                d: "M-4,-5 Q0,-15 4,-5",
                stroke: "#ffcccb",
                "stroke-width": "2",
                class: "animate-flame"
            })
        ]);
    },

    renderHeldBeaker: function() {
        const { scientistX, direction } = this.state;
        return m("g", { transform: `translate(${scientistX + (direction * 8)}, 25)` }, [
            m("path", {
                d: "M-4,0 L-3,10 L3,10 L4,0",
                fill: this.state.heldBeaker.color,
                stroke: "#fff",
                "stroke-width": "1"
            })
        ]);
    },

    renderCat: function() {
        const catX = 300 + Math.random() * 400;
        return m("g.cat", { transform: `translate(${catX}, 40)` }, [
            m("path", {
                d: "M-3,0 Q0,-5 3,0 M-4,-3 L-6,-5 M4,-3 L6,-5 M0,0 Q-4,4 0,2 Q4,4 0,2",
                stroke: "#fff",
                "stroke-width": "1",
                fill: "none",
                class: "animate-cat"
            })
        ]);
    },

    getAnimationStyles: function() {
        return `
            @keyframes walk {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
            }
            @keyframes flame {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(1.2); }
            }
            @keyframes cat {
                0%, 100% { opacity: 1; transform: translateY(0); }
                50% { opacity: 0.8; transform: translateY(-2px); }
            }
            .walking-legs, .walking-arms { animation: walk 0.5s infinite; }
            .animate-flame { 
                animation: flame 0.8s infinite;
                transform-origin: center bottom;
            }
            .animate-cat { animation: cat 2s infinite; }
        `;
    }
};

module.exports = ScientistLogo;