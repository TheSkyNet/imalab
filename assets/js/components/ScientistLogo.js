// ScientistLogo.js
const ScientistLogo = {
    oninit: function() {
        this.state = {
            scientistX: 100,
            direction: 1,
            walkPhase: 0,
            catVisible: false,
            currentAction: 'walk',
            targetX: null,
            beakers: [
                { id: 1, x: 200, color: '#ffb3b3', filled: true }, // Pink
                { id: 2, x: 350, color: '#b8e6b8', filled: true }, // Green
                { id: 3, x: 500, color: '#b3d9ff', filled: true }, // Blue
                { id: 4, x: 650, color: null, filled: false }      // Empty mixing beaker
            ],
            heldBeaker: null,
            bunsenX: 700,
            lastInteractionTime: 0,
        };
    },


    oncreate: function() {
        this.startAnimation();
        // Simple cat appearances every 5 seconds
        this.catInterval = setInterval(() => {
            this.state.catVisible = !this.state.catVisible;
            m.redraw();
        }, 5000);
    },

    onremove: function() {
        clearInterval(this.catInterval);
        cancelAnimationFrame(this.animationFrame);
    },
    chooseNewDestination: function() {
        const possibleDestinations = [
            ...this.state.beakers.map(b => b.x),
            this.state.heldBeaker ? this.state.bunsenX : null
        ].filter(x => x !== null && Math.abs(x - this.state.scientistX) > 100);

        if (possibleDestinations.length > 0) {
            const randomIndex = Math.floor(Math.random() * possibleDestinations.length);
            this.state.targetX = possibleDestinations[randomIndex];
            this.state.direction = this.state.targetX > this.state.scientistX ? 1 : -1;
        } else {
            // If no valid destinations, just walk to a random point
            this.state.targetX = 100 + Math.random() * 700;
            this.state.direction = this.state.targetX > this.state.scientistX ? 1 : -1;
        }
    },

    startAnimation: function() {
        this.chooseNewDestination();
        const animate = () => {
            const now = Date.now();
            if (this.state.currentAction === 'walk') {
                this.state.walkPhase = (this.state.walkPhase + 0.15) % (2 * Math.PI);
                this.state.scientistX += 2 * this.state.direction;

                // Check if we reached target or boundaries
                if (Math.abs(this.state.scientistX - this.state.targetX) < 5 ||
                    this.state.scientistX > 800 || this.state.scientistX < 100) {
                    if (now - this.state.lastInteractionTime > 2000) {
                        this.chooseNewDestination();
                    }
                }

                this.checkInteractions();
            }
            m.redraw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    },


    checkInteractions: function() {
        const now = Date.now();
        // Only check for interactions if enough time has passed
        if (now - this.state.lastInteractionTime < 2000) {
            return;
        }

        const nearestBeaker = this.state.beakers.find(b =>
            Math.abs(this.state.scientistX - b.x) < 15 &&
            (this.state.heldBeaker ? !b.filled : b.filled)
        );

        if (nearestBeaker) {
            this.state.currentAction = 'interact';
            this.state.lastInteractionTime = now;
            setTimeout(() => {
                this.handleBeakerInteraction(nearestBeaker);
                this.chooseNewDestination();
            }, 500);
            return;
        }

        if (Math.abs(this.state.scientistX - this.state.bunsenX) < 15 &&
            this.state.heldBeaker &&
            this.state.targetX === this.state.bunsenX) {
            this.state.currentAction = 'heat';
            this.state.lastInteractionTime = now;
            setTimeout(() => {
                this.state.heldBeaker.color = this.darkenColor(this.state.heldBeaker.color);
                this.state.currentAction = 'walk';
                this.chooseNewDestination();
            }, 2000);
        }
    },

    handleBeakerInteraction: function(beaker) {
        if (!this.state.heldBeaker && beaker.filled) {
            this.state.heldBeaker = { ...beaker };
            beaker.filled = false;
            this.state.heatedBeaker = false; // Reset heated state when picking up new beaker
        } else if (this.state.heldBeaker && !beaker.filled) {
            beaker.filled = true;
            beaker.color = this.state.heldBeaker.color;
            this.state.heldBeaker = null;
            this.state.heatedBeaker = false; // Reset heated state after pouring
        }
        setTimeout(() => {
            this.state.currentAction = 'walk';
        }, 500);
    }
    ,

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

                // Beakers
                ...this.state.beakers.map(this.renderBeaker.bind(this)),

                // Cat (add this line!)
                this.state.catVisible && this.renderCat(),

                // Bunsen burner
                this.renderBunsenBurner(),

                // Scientist
                this.renderScientist(),

                // Held beaker
                this.state.heldBeaker && this.renderHeldBeaker()
            ]),

            m("style", `
                ${this.getAnimationStyles()}
                .animate-cat {
                    animation: bounce 0.5s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }
            `)
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
                    "M-3,15 L-3,20 M3,15 L3,20", // Changed to parallel lines when standing
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
        return m("g.cat", {
            transform: `translate(850, 42)` // Moved slightly down
        }, [
            // Body (smaller oval)
            m("path", {
                d: "M0,0 Q2,-4 4,0 Q6,-4 8,0 Q4,2 0,0",
                fill: "#333333", // Very dark gray
                class: "animate-cat"
            }),
            // Face
            m("path", {
                d: "M2.5,-1 L3,-1 M5,-1 L5.5,-1", // Tiny eyes
                stroke: "#fff",
                "stroke-width": "0.5"
            }),
            // Ears (smaller triangles)
            m("path", {
                d: "M2,-4 L3,-5 L4,-4 M6,-4 L7,-5 L8,-4",
                fill: "#333333",
                stroke: "#333333",
                "stroke-width": "0.5"
            }),
            // Curly tail
            m("path", {
                d: "M8,0 Q10,-2 9,-4 Q8,-6 10,-5",
                stroke: "#333333",
                "stroke-width": "1",
                fill: "none",
                class: "animate-tail"
            })
        ]);
    },


    getAnimationStyles: function() {
        return `
           .animate-cat {
                animation: bounce 2s infinite;
            }
            .animate-tail {
                animation: tail-wave 2s infinite;
            }

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