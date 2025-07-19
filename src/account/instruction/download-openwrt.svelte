<script lang="ts">
    import type { VpnConfig } from '../database';

    interface Props {
        config: VpnConfig;
    }

    let { config = $bindable() }: Props = $props();

    let initdService = $derived(`
#!/bin/sh /etc/rc.common

START=99

USE_PROCD=1

PROG="/usr/bin/xray"
CONFIG="/etc/xray/config.json"
ASSETS="/usr/share/xray"
CONFIG_URL="${ config.xrayClientConfigTproxyUrl }"

download_config() {
    wget -O $CONFIG $CONFIG_URL
}

setup_iptables() {
    # https://github.com/mostm/openwrt-xray/blob/34128fef00a26885530a00e75fd4d1be61f444e0/root/configure_xray_startup.sh

    # Ensure this script runs only once per boot
    if [ -f /tmp/configure_xray_startup_executed ]; then
        return
    fi

    # create chain
    ip rule add fwmark 1 table 100
    ip route add local 0.0.0.0/0 dev lo table 100
    iptables -t mangle -N XRAY

    # exclude private ipv4
    iptables -t mangle -A XRAY -d 255.255.255.255/32 -j RETURN
    iptables -t mangle -A XRAY -d 0.0.0.0/8 -j RETURN
    iptables -t mangle -A XRAY -d 10.0.0.0/8 -j RETURN
    iptables -t mangle -A XRAY -d 100.64.0.0/10 -j RETURN
    iptables -t mangle -A XRAY -d 127.0.0.0/8 -j RETURN
    iptables -t mangle -A XRAY -d 169.254.0.0/16 -j RETURN
    iptables -t mangle -A XRAY -d 172.16.0.0/12 -j RETURN
    iptables -t mangle -A XRAY -d 192.0.0.0/24 -j RETURN
    iptables -t mangle -A XRAY -d 192.0.2.0/24 -j RETURN
    iptables -t mangle -A XRAY -d 192.168.0.0/16 -j RETURN
    iptables -t mangle -A XRAY -d 198.18.0.0/15 -j RETURN
    iptables -t mangle -A XRAY -d 198.51.100.0/24 -j RETURN
    iptables -t mangle -A XRAY -d 203.0.113.0/24 -j RETURN
    iptables -t mangle -A XRAY -d 224.0.0.0/4 -j RETURN
    iptables -t mangle -A XRAY -d 240.0.0.0/4 -j RETURN
    iptables -t mangle -A XRAY -d 1.1.1.1 -j RETURN

    # exclude forwarding to and from 10.241.1.3 on ports 80 and 443
    iptables -t mangle -A XRAY -d 10.241.1.3/32 -p tcp --dport 80 -j RETURN
    iptables -t mangle -A XRAY -d 10.241.1.3/32 -p tcp --dport 443 -j RETURN
    iptables -t mangle -A XRAY -d 10.241.1.3/32 -p udp --dport 80 -j RETURN
    iptables -t mangle -A XRAY -d 10.241.1.3/32 -p udp --dport 443 -j RETURN
    iptables -t mangle -A XRAY -s 10.241.1.3/32 -p tcp --sport 80 -j RETURN
    iptables -t mangle -A XRAY -s 10.241.1.3/32 -p tcp --sport 443 -j RETURN
    iptables -t mangle -A XRAY -s 10.241.1.3/32 -p udp --sport 80 -j RETURN
    iptables -t mangle -A XRAY -s 10.241.1.3/32 -p udp --sport 443 -j RETURN

    # add forwarding rule
    iptables -t mangle -A XRAY -p tcp -j TPROXY --on-port 1083 --tproxy-mark 1
    iptables -t mangle -A XRAY -p udp -j TPROXY --on-port 1083 --tproxy-mark 1
    iptables -t mangle -A PREROUTING -j XRAY

    touch /tmp/configure_xray_startup_executed
}

start_service() {
    # https://gist.github.com/loskiq/d0a7af04be2029db8e8b5b825418247b#file-xray

    download_config
    setup_iptables

    procd_open_instance [xray]
    procd_set_param command $PROG -c $CONFIG
    procd_set_param respawn \${respawn_threshold:-3600} \${respawn_timeout:-5} \${respawn_retry:-5}
    procd_set_param env XRAY_LOCATION_ASSET="$ASSETS"
    procd_set_param limits core="unlimited"
    procd_set_param limits nofile="1000000 1000000"
    procd_set_param stdout 1
    procd_set_param stderr 1
    procd_set_param pidfile /var/run/xray.pid
    procd_set_param term_timeout 60
    procd_close_instance
}`.trim());
</script>

<ol>
    <li>
        <p>Install prerequisits:</p>
        <pre>opkg update
opkg install iptables-mod-tproxy kmod-ipt-tproxy</pre>
    </li>
    <li>
        <p>Install xray:</p>
        <pre>opkg install xray-core</pre>
        <ul uk-accordion class="uk-margin-bottom">
            <li>
                <a class="uk-accordion-title uk-text-default" href><b>If it's not available via <code>opkg</code>, click here</b></a>
                <div class="uk-accordion-content">
                    <ol>
                        <li>
                            <p>Create directories:</p>
                            <pre>mkdir /etc/xray/
mkdir /usr/share/xray/</pre>
                        </li>
                        <li>
                            Download xray from <a href="https://github.com/XTLS/Xray-core/releases" target="_blank">GitHub</a> and
                            <ul>
                                <li>save the executable to <code>/usr/bin/xray</code></li>
                                <li>save and other files to <code>/usr/share/xray/</code> directory</li>
                            </ul> 
                        </li>
                        <li>
                            Make xray executable:
                            <pre>chmod +x /usr/bin/xray</pre>
                        </li>
                    </ol>
                </div>
            </li>
        </ul>
    </li>
    <li>
        <p>Create file <code>/etc/init.d/xray</code> with the following content. If the file already exists, replace it</p>
        <pre>{ initdService }</pre>
    </li>
    <li>
        <p>Make it executable:</p>
        <pre>chmod +x /etc/init.d/xray</pre>
    </li>
    <li>
        <p>Enable and start the service:</p>
        <pre>/etc/init.d/xray enable
/etc/init.d/xray start</pre>
    </li>
</ol>

<p><b>Done!</b></p>
<p>To disable xray, run <code>/etc/init.d/xray disable</code> and reboot the router. To enable it back, run commands from the 5th point above (enable & start).</p>

<p class="uk-text-small uk-text-muted">Based on <a href="https://www.youtube.com/watch?v=VFfvCfTRn14" target="_blank">https://www.youtube.com/watch?v=VFfvCfTRn14</a> and <a href="https://github.com/mostm/openwrt-xray" target="_blank">mostm/openwrt-xray</a>.</p>
