<script lang="ts">
    const { uuid }: { uuid: string } = $props();

    const manifest = $derived({
        name: "Anywhere VPN",
        "short_name": "AnywhereVPN",
        description: "Anywhere VPN - безопасный и анонимный ВПН",
        orientation: "any",
        categories: ["utilities", "tools", "vpn", "internet", "security", "privacy"],
        icons: [
            {
                src: `${location.origin}/logo.png`,
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            
        ],
        screenshots: [
            {
                src: "https://watchtogether.online/screenshots/mobile-1.jpeg",
                sizes: "1170x2532",
                type: "image/jpeg",
                "form_factor": "narrow"
            },
            {
                src: "https://watchtogether.online/screenshots/mobile-2.jpeg",
                sizes: "1170x2532",
                type: "image/jpeg",
                "form_factor": "narrow"
            },
            {
                src: "https://watchtogether.online/screenshots/desktop-1.jpeg",
                sizes: "3456x2234",
                type: "image/jpeg",
                "form_factor": "wide"
            },
            {
                src: "https://watchtogether.online/screenshots/desktop-2.jpeg",
                sizes: "3456x2234",
                type: "image/jpeg",
                "form_factor": "wide"
            }
        ],
        shortcuts: [
            {
                name: "Подключить ВПН",
                url: `${location.origin}/#/${uuid}/instruction`,
                icons: [
                    {
                        src: `${location.origin}/connect.png`,
                        sizes: "92x92",
                    },
                ],
            },
            {
                name: "Поделиться ВПНом",
                url: `${location.origin}/#/${uuid}/children`,
                icons: [
                    {
                        src: `${location.origin}/share.png`,
                        sizes: "92x92",
                    },
                ],
            },
        ],
        "start_url": `${location.origin}/#/${uuid}`,
        display: "standalone",
        "background_color": "#f4f4f4",
        "theme_color": "#f4f4f4",
    });

    const manifestURL = $derived(URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: "application/json" })));
</script>

<svelte:head>
    <title>Anywhere VPN</title>
    <link rel="icon" type="image/svg" href="/logo.png" />
    <link rel="manifest" href={manifestURL} />
</svelte:head>
