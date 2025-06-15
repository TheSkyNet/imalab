const {Terminal} = require("./Dashbord/Terminal");
const AdminDashboard = {
    fakeData: {
        systemStats: {
            cpu: { usage: 45, label: "CPU Load", symbol: "⚡" },
            memory: { usage: 68, label: "Memory Usage", symbol: "💾" },
            storage: { usage: 72, label: "Storage", symbol: "💿" },
            network: { usage: 34, label: "Network", symbol: "🌐" }
        },
        experimentStats: {
            activeExperiments: 23,
            completedTests: 1458,
            successRate: "87.5%",
            uptime: "99.98%"
        },
        recentCommands: [
            { command: "run_experiment --id=1337", status: "success", time: "2m ago" },
            { command: "analyze_data -t regression", status: "running", time: "5m ago" },
            { command: "backup_results --all", status: "success", time: "15m ago" },
            { command: "calibrate_sensors", status: "failed", time: "1h ago" }
        ]
    },

    view: () => {
        return m("div.dashboard", {
            style: {
                padding: "2rem",
                background: "#f0f4f8",
                minHeight: "100vh",
                fontFamily: "monospace"
            }
        }, [


            // Command Terminal
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

module.exports = { AdminDashboard };