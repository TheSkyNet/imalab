const Terminal = {
    oninit: (vnode) => {
        Terminal.state = {
            history: [],
            currentCommand: "",
            prompt: vnode.attrs.prompt || ">",
            commands: {
                ...defaultCommands,
                ...(vnode.attrs.commands || {})
            }
        };
    },

    state: {
        history: [],
        currentCommand: "",
        prompt: ">",
        commands: {}
    },

    defaultCommands: {
        help: () => "Available commands: " + Object.keys(Terminal.state.commands).join(", "),
        clear: () => {
            Terminal.state.history = [];
            return null;
        },
        echo: (args) => args.join(" "),
        date: () => new Date().toLocaleString(),
        whoami: () => "lab-user@terminal",
    },

    processCommand(input) {
        const args = input.trim().split(/\s+/);
        const cmd = args[0].toLowerCase();
        const cmdArgs = args.slice(1);

        let response;
        if (this.state.commands[cmd]) {
            try {
                response = this.state.commands[cmd](cmdArgs);
            } catch (e) {
                response = `Error executing command: ${e.message}`;
            }
        } else {
            response = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        this.state.history.push({
            cmd: input,
            response,
            timestamp: new Date().toISOString()
        });
        this.state.currentCommand = "";
    },

    view: (vnode) => {
        const { backgroundColor = "#2d3748", textColor = "#a0aec0", maxHeight = "400px" } = vnode.attrs;

        return m("div.terminal", {
            style: {
                background: backgroundColor,
                borderRadius: "8px",
                padding: "1rem",
                color: textColor,
                fontFamily: "monospace",
                maxHeight: maxHeight,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            }
        }, [
            // Terminal Header with dots
            m("div.terminal-header", {
                style: {
                    marginBottom: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center"
                }
            }, [
                // Window-style dots
                m("span.dot", { style: { color: "#fc8181" } }, "●"),
                m("span.dot", { style: { color: "#f6ad55" } }, "●"),
                m("span.dot", { style: { color: "#68d391" } }, "●"),
                // Optional title
                vnode.attrs.title && m("span.terminal-title", {
                    style: {
                        marginLeft: "1rem",
                        color: "#e2e8f0",
                        fontSize: "0.9em"
                    }
                }, vnode.attrs.title)
            ]),

            // Terminal content area
            m("div.terminal-content", {
                style: {
                    flex: 1,
                    overflowY: "auto"
                }
            }, [
                // Command History
                ...Terminal.state.history.map(entry => [
                    m("div.command-line", {
                        style: {
                            display: "flex",
                            gap: "0.5rem",
                            color: "#68d391",
                            marginBottom: "0.25rem"
                        }
                    }, [
                        m("span.prompt", Terminal.state.prompt),
                        m("span.command", entry.cmd)
                    ]),
                    entry.response && m("div.response", {
                        style: {
                            marginBottom: "0.75rem",
                            paddingLeft: "calc(1rem + " + Terminal.state.prompt.length + "ch)",
                            whiteSpace: "pre-wrap",
                            color: "#e2e8f0"
                        }
                    }, entry.response)
                ]),

                // Command Input Line
                m("div.command-input", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }
                }, [
                    m("span.prompt", {
                        style: { color: "#68d391" }
                    }, Terminal.state.prompt),
                    m("input[type=text]", {
                        value: Terminal.state.currentCommand,
                        style: {
                            background: "transparent",
                            border: "none",
                            color: "#e2e8f0",
                            fontFamily: "monospace",
                            flex: 1,
                            outline: "none",
                            fontSize: "inherit"
                        },
                        autocomplete: "off",
                        spellcheck: false,
                        onkeydown: (e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if (Terminal.state.currentCommand.trim()) {
                                    Terminal.processCommand(Terminal.state.currentCommand);
                                    m.redraw();
                                }
                            }
                        },
                        oninput: (e) => {
                            Terminal.state.currentCommand = e.target.value;
                        }
                    })
                ])
            ])
        ]);
    }
};

// Usage example in AdminDashboard:
const AdminDashboard = {
    // ... other dashboard code ...

    terminalCommands: {
        status: () => "All systems operational ✓",
        experiments: () => "Currently running 23 experiments",
        uptime: () => "System uptime: 47 days, 13 hours",
        sensors: () => "Temperature: 22°C\nHumidity: 45%\nPressure: 1013 hPa",
    },

    view: () => {
        return m("div.dashboard", {
            style: {
                padding: "2rem",
                background: "#f0f4f8",
                minHeight: "100vh"
            }
        }, [


            // Terminal usage
            m(Terminal, {
                title: "Laboratory Control Terminal",
                prompt: "lab>",
                commands: AdminDashboard.terminalCommands,
                maxHeight: "400px"
            })
        ]);
    }
};

module.exports = { Terminal };