import plugin from "../plugin.json";

class AcodePlugin {
	init() {
		this.$page.id = "test";
		this.$page.settitle("Ghostman - API Tester");
		acode.addIcon(
			"ghostman-api-tester",
			`https://localhost/__cdvfile_files-external__/plugins/${plugin.id}/assets/ghostman.png`
		);
		const loader = `
    <style>
    .parent_l{
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #0068ff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
    </style>
    <div class="parent_l"><span class="loader"></span></div>
    `;
		const styleTag = tag("link", {
			rel: "stylesheet",
			href: `https://localhost/__cdvfile_files-external__/plugins/${plugin.id}/assets/index.css`
		});
		document.head.append(styleTag);
		const div = tag("div", {
			id: "_api_tester_root"
		});
		div.innerHTML = loader;
		this.$page.appendBody(div);
		const scriptTag = tag("script", {
			id: "api_t_script",
			type: "module",
			src: `https://localhost/__cdvfile_files-external__/plugins/${plugin.id}/assets/index.js`,
			attr: {
				crossorigin: ""
			}
		});
		this.$page.appendBody(scriptTag);
		const rootHeader = root.querySelector("header");
		this.pageOpenBtn = tag("span", {
			className: "icon ghostman-api-tester",
			style: { pointerEvents: "all" },
			onclick: () => {
				this.$page.show();
			}
		});
		// rootHeader.append(pageOpenBtn);
		rootHeader.insertBefore(this.pageOpenBtn, rootHeader.lastChild);
	}

	destroy() {
		this.pageOpenBtn?.remove();
	}
}

if (window.acode) {
	const acodePlugin = new AcodePlugin();
	acode.setPluginInit(
		plugin.id,
		(baseUrl, $page, { cacheFileUrl, cacheFile }) => {
			if (!baseUrl.endsWith("/")) {
				baseUrl += "/";
			}
			acodePlugin.baseUrl = baseUrl;
			acodePlugin.$page = $page;
			acodePlugin.init();
		}
	);
	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}