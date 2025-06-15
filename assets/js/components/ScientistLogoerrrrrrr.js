
const ScientistLogo = {
    oninit: function() {
        this.state = {
            scientistX: 100,
            direction: 1,
            walkPhase: 0,
            catVisible: false,
            currentAction: 'walk',
            beakers: [
                { id: 1, x: 200, color: '#ffb3b3', filled: true }, // Pink
                { id: 2, x: 350, color: '#b8e6b8', filled: true }, // Green
                { id: 3, x: 500, color: '#b3d9ff', filled: true }  // Blue
            ],
            heldBeaker: null,
            bunsenX: 700
        };
    },

    oncreate: function() {
        this.startAnimation();
        this.catInterval = setInterval(() => {
            this.state.catVisible = Math.random() < 0.3;
            m.redraw();
        }, 8000);
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

                if (this.state.scientistX > 800 || this.state.scientistX < 100) {
                    this.state.direction *= -1;
                }

                this.checkInteractions();
            }
            m.redraw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    },

    checkInteractions: function() {
        const nearestBeaker = this.state.beakers.find(b =>
            Math.abs(this.state.scientistX - b.x) < 15
        );

        if (nearestBeaker) {
            this.state.currentAction = 'interact';
            setTimeout(() => this.handleBeakerInteraction(nearestBeaker), 1000);
            return;
        }

        if (Math.abs(this.state.scientistX - this.state.bunsenX) < 15 && this.state.heldBeaker) {
            this.state.currentAction = 'heat';
            setTimeout(() => {
                this.state.heldBeaker.color = this.darkenColor(this.state.heldBeaker.color);
                this.state.currentAction = 'walk';
            }, 2000);
        }
    },

    handleBeakerInteraction: function(beaker) {
        if (!this.state.heldBeaker && beaker.filled) {
            this.state.heldBeaker = { ...beaker };
            beaker.filled = false;
        } else if (this.state.heldBeaker && !beaker.filled) {
            beaker.filled = true;
            beaker.color = this.state.heldBeaker.color;
            this.state.heldBeaker = null;
        }
        setTimeout(() => {
            this.state.currentAction = 'walk';
        }, 1000);
    },

    darkenColor: function(color) {
        const num = parseInt(color.slice(1), 16);
        const factor = 0.8;
        const r = Math.floor(((num >> 16) & 255) * factor);
        const g = Math.floor(((num >> 8) & 255) * factor);
        const b = Math.floor((num & 255) * factor);
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    },

    view: function() {
        return m("div.scientist-lab", {
            style: { width: "calc(100% - 300px)", height: "50px", margin: "0 20px" }
        }, [
            m("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 1000 60",
                style: { width: "100%", height: "100%", overflow: "visible" }
            }, [
                // Beakers
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
            m("style", this.getAnimationStyles())
        ]);
    },

    renderScientist: function() {
        const { scientistX, direction, currentAction, walkPhase } = this.state;
        const legOffset = Math.sin(walkPhase) * 3;

        return m("g.scientist", {
            transform: `translate(${scientistX}, 35) scale(${direction}, 1)`
        }, [
            // Head
            m("circle", { cx: 0, cy: 0, r: 4, fill: "#fff" }),
            // Body
            m("line", { x1: 0, y1: 4, x2: 0, y2: 15, stroke: "#fff", "stroke-width": "2" }),
            // Arms
            m("path", {
                d: currentAction === 'interact' || currentAction === 'heat' ?
                    "M0,8 L-6,12 M0,8 L6,12" :
                    `M0,8 L${-4 * Math.sin(walkPhase)},12 M0,8 L${4 * Math.sin(walkPhase + Math.PI)},12`,
                stroke: "#fff",
                "stroke-width": "2"
            }),
            // Legs (pointing downward)
            m("path", {
                d: currentAction === 'walk' ?
                    `M0,15 L${-legOffset},22 M0,15 L${legOffset},22` :
                    "M-2,15 L0,22 L2,15",
                stroke: "#fff",
                "stroke-width": "2"
            })
        ]);
    },

    renderBeaker: function(beaker) {
        return m("g.beaker", { transform: `translate(${beaker.x}, 30)` }, [
            m("path", {
                d: "M-5,0 L-4,15 L4,15 L5,0",
                fill: "none",
                stroke: "#fff",
                "stroke-width": "1"
            }),
            beaker.filled && m("rect", {
                x: -3, y: 3,
                width: 6, height: 11,
                fill: beaker.color,
                opacity: 0.8
            })
        ]);
    },

    renderBunsenBurner: function() {
        return m("g.bunsen", { transform: `translate(${this.state.bunsenX}, 30)` }, [
            m("rect", {
                x: -4, y: 0,
                width: 8, height: 15,
                fill: "#666"
            }),
            this.state.currentAction === 'heat' && m("path.flame", {
                d: "M-2,-2 Q0,-8 2,-2",
                stroke: "#ff6b6b",
                "stroke-width": "2",
                class: "animate-flame"
            })
        ]);
    },

    renderHeldBeaker: function() {
        const offset = this.state.direction * 6;
        return m("g", { transform: `translate(${this.state.scientistX + offset}, 25)` }, [
            m("path", {
                d: "M-3,0 L-2,8 L2,8 L3,0",
                fill: this.state.heldBeaker.color,
                stroke: "#fff",
                "stroke-width": "1",
                opacity: 0.8
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
            @keyframes flame {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(1.2); }
            }
            @keyframes cat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-1px); }
            }
            .animate-flame { 
                animation: flame 0.5s infinite;
                transform-origin: center bottom;
            }
            .animate-cat { 
                animation: cat 2s infinite;
            }
        `;
    }
};

module.exports = ScientistLogo;