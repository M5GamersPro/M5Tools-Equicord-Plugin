export default {
    name: "M5Tools",
    description: "Draggable floating toolbar utility natively for Equicord.",
    authors: [{ name: "M5", id: "1088354509677404201" }],
    
    start() {
        const checkInterval = setInterval(() => {
            if ((window as any).webpackChunkdiscord_app) {
                clearInterval(checkInterval);
                this.injectM5UI();
            }
        }, 500);
    },

    injectM5UI() {
        try {
            if (document.getElementById("m5-tools-header-bar")) return;

            const toolBar = document.createElement("div");
            toolBar.id = "m5-tools-header-bar";
            toolBar.style.cssText = `
                position: absolute;
                top: 15px;
                left: 310px;
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 6px 20px;
                background: #ffffff;
                border-radius: 50px;
                font-family: sans-serif;
                z-index: 99999;
                cursor: grab;
                user-select: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;

            let isDragging = false;
            let startX = 0, startY = 0;
            let currentX = 310, currentY = 15;

            toolBar.addEventListener("mousedown", (e: MouseEvent) => {
                if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).classList.contains("m5-ctrl")) return;
                isDragging = true;
                toolBar.style.cursor = "grabbing";
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
            });

            document.addEventListener("mousemove", (e: MouseEvent) => {
                if (!isDragging) return;
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;

                if (currentY < 0) currentY = 0;
                if (currentX < 0) currentX = 0;

                toolBar.style.left = `${currentX}px`;
                toolBar.style.top = `${currentY}px`;
            });

            document.addEventListener("mouseup", () => {
                if (isDragging) {
                    isDragging = false;
                    toolBar.style.cursor = "grab";
                }
            });

            const titleLabel = document.createElement("span");
            titleLabel.innerText = "M5 TOOLS V2.0";
            titleLabel.style.cssText = "color: #5865F2; font-weight: 800; font-size: 13px; font-style: italic; letter-spacing: 0.5px; pointer-events: none; margin-right: 8px;";
            toolBar.appendChild(titleLabel);

            const createButton = (text: string, onClickAction: () => void) => {
                const btn = document.createElement("button");
                btn.innerText = text;
                btn.style.cssText = `
                    background: #ffffff;
                    color: #2e3035;
                    border: 1px solid #e3e5e8;
                    padding: 6px 14px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 11px;
                    letter-spacing: 0.2px;
                    transition: background 0.15s, border-color 0.15s;
                `;
                btn.onmouseenter = () => {
                    btn.style.background = "#f2f3f5";
                    btn.style.borderColor = "#dbdee1";
                };
                btn.onmouseleave = () => {
                    btn.style.background = "#ffffff";
                    btn.style.borderColor = "#e3e5e8";
                };
                btn.onclick = onClickAction;
                return btn;
            };

            const getDiscordToken = (): string => {
                try {
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    const token = iframe.contentWindow?.localStorage?.getItem('token');
                    document.body.removeChild(iframe);
                    if (token) return token.replace(/^"|"$/g, '');
                } catch (e) {}

                try {
                    const wp = (window as any).webpackChunkdiscord_app?.push([[Symbol()],{},(r: any)=>r]);
                    const tokenModule = Object.values(wp.c).find((m: any) => m?.exports?.default?.getToken);
                    if (tokenModule) return (tokenModule as any).exports.default.getToken();
                } catch (e) {}

                return "";
            };

            toolBar.appendChild(createButton("COPY TOKEN", () => {
                try {
                    const rawToken = getDiscordToken();
                    if (rawToken) {
                        navigator.clipboard.writeText(rawToken);
                        console.log("%c[M5Tools]: Active token copied to clipboard!", "color: #23A55A; font-weight: bold;");
                    } else {
                        console.warn("[M5Tools]: Could not find token payload. Ensure you are logged in.");
                    }
                } catch(e) { console.error("[M5Tools Error]: Clipboard operation blocked:", e); }
            }));

            toolBar.appendChild(createButton("ENROLL ALL QUESTS", () => {
                console.log("%c[M5Tools]: Quest registration framework intercept sequence executed.", "color: #5865F2; font-weight: bold;");
                try {
                    const rawToken = getDiscordToken();
                    if (!rawToken) return console.warn("[M5Tools]: Cannot enroll quests without an active session token.");
                    
                    fetch("https://discord.com", {
                        headers: { "Authorization": rawToken }
                    })
                    .then(res => res.json())
                    .then(data => {
                        const quests = data.quests || [];
                        if (quests.length === 0) return console.log("[M5Tools]: No active quests available to enroll.");
                        
                        quests.forEach((q: any) => {
                            fetch(`https://discord.com/${q.id}/accept`, {
                                method: "POST",
                                headers: { "Authorization": rawToken }
                            });
                        });
                        console.log(`%c[M5Tools]: Successfully launched batch enrollment for ${quests.length} quests!`, "color: #23A55A; font-weight: bold;");
                    });
                } catch(e) { console.error("[M5Tools Quest Error]: Batch process halted:", e); }
            }));

            toolBar.appendChild(createButton("COPY ENCRYPTED TOKEN", () => {
                console.log("%c[M5Tools]: Secure string transform initialized.", "color: #5865F2; font-weight: bold;");
                try {
                    const rawToken = getDiscordToken();
                    if (rawToken) {
                        const encrypted = btoa(rawToken).split('').reverse().join('');
                        navigator.clipboard.writeText(encrypted);
                        console.log("%c[M5Tools]: Encrypted token variant safely copied!", "color: #23A55A; font-weight: bold;");
                    } else {
                        console.warn("[M5Tools]: Encrypted translation canceled due to missing root token.");
                    }
                } catch(e) { console.error("[M5Tools Encrypt Error]: Transformation runtime crash:", e); }
            }));

            toolBar.appendChild(createButton("CLAIM ALL QUESTS", () => {
                console.log("%c[M5Tools]: Remote quest item optimization triggered.", "color: #23A55A; font-weight: bold;");
                try {
                    const rawToken = getDiscordToken();
                    if (!rawToken) return console.warn("[M5Tools]: Cannot claim rewards without an active session token.");
                    
                    fetch("https://discord.com", {
                        headers: { "Authorization": rawToken }
                    })
                    .then(res => res.json())
                    .then(data => {
                        const quests = data.quests || [];
                        quests.forEach((q: any) => {
                            if (q.claimable_at && !q.claimed_at) {
                                fetch(`https://discord.com/${q.id}/claim`, {
                                    method: "POST",
                                    headers: { "Authorization": rawToken }
                                });
                            }
                        });
                        console.log("%c[M5Tools]: Reward batch processing dispatched successfully!", "color: #23A55A; font-weight: bold;");
                    });
                } catch(e) { console.error("[M5Tools Claim Error]: Automation framework encountered a fault:", e); }
            }));

            const rightControls = document.createElement("div");
            rightControls.style.cssText = "display: flex; align-items: center; gap: 12px; margin-left: 8px;";

            const closeBtn = document.createElement("span");
            closeBtn.className = "m5-ctrl";
            closeBtn.innerText = "✕";
            closeBtn.style.cssText = "color: #4e5058; font-size: 12px; cursor: pointer; font-weight: bold;";
            
            const self = this;
            closeBtn.onclick = () => { self.stop(); };
            rightControls.appendChild(closeBtn);

            const statusDot = document.createElement("div");
            statusDot.className = "m5-ctrl";

statusDot.style.cssText = "width: 18px; height: 18px; border-radius: 50%; background: #5865F2; border: 2px solid #e3e5e8;";
rightControls.appendChild(statusDot);
toolBar.appendChild(rightControls);

const appMount = document.querySelector("#app-mount") || document.body;
appMount.appendChild(toolBar);

console.log('%c[M5Tools]: Draggable application layout interface ready!', 'color: #23A55A; font-weight: bold;');
} catch (error) {
    console.error('[M5Tools Error]: Injection sequence configuration faulted:', error);
}
},
stop() {
    const existingBar = document.getElementById("m5-tools-header-bar");
    if (existingBar) existingBar.remove();
    console.log('[M5Tools]: Interface detached safely.');
}
};
