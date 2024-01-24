import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Terminal as Xterm } from "xterm"
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from "xterm-addon-fit"
import { WebLinksAddon } from "xterm-addon-web-links"

import 'xterm/css/xterm.css'

export type TerminalProps = {

    url: string

    [key: string]: any
}

let Terminal: React.FC<TerminalProps> = (props: TerminalProps, ref) => {

    const { url } = props

    const [trytimes, setTryTimes] = useState<number>(0)

    const container = useRef<HTMLDivElement>(null)
    const terminal = useRef<Xterm>()
    const fit = useRef<FitAddon>()

    const debounceWebsocket = useRef<any>()
    const websocket = useRef<WebSocket>()

    // debounce
    const debounceResizeObserver = useRef<any>()
    const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries) || !entries.length) {
            return;
        }
        if (debounceResizeObserver?.current) clearTimeout(debounceResizeObserver?.current)
        debounceResizeObserver.current = setTimeout(() => {
            fit?.current?.fit()
        }, 100);
    })

    const onclose = () => {
        console.log('close...')
    }

    useEffect(() => {
        if (container?.current) {
            terminal.current = new Xterm({
                cursorStyle: 'underline',
                cursorBlink: false,
                disableStdin: true,
            })
            fit.current = new FitAddon()
            terminal?.current?.loadAddon(fit?.current)
            terminal?.current?.loadAddon(new WebLinksAddon())
            terminal?.current?.open(container?.current)
            terminal?.current?.focus()
            fit.current?.fit()
            resizeObserver?.observe(container?.current)
        }
        return () => {
            terminal.current && terminal.current?.dispose()
            fit?.current && fit?.current?.dispose()
            websocket?.current && websocket?.current?.close()
            container?.current && resizeObserver?.unobserve(container?.current)
        }
    }, [])

    useEffect(() => {
        if (debounceWebsocket?.current) clearTimeout(debounceWebsocket?.current)
        debounceWebsocket.current = setTimeout(() => {
            if (websocket?.current) websocket?.current?.close()
            if (!url) return
            websocket.current = new WebSocket(url)
            // websocket.current.onopen = onopen
            // websocket.current.onmessage = onmessage
            websocket.current.onclose = onclose
            // websocket.current.onerror = onerror
            terminal.current?.loadAddon(new AttachAddon(websocket?.current))
        }, 500)
    }, [url])

    useImperativeHandle(ref, () => ({
        write: (text: string) => {
            // terminal?.current?.write(`${text}\r`)
            websocket?.current?.send(`${text}\r`)
        }
    }))

    return <div ref={container}
        style={{ width: '100%', height: '100%' }} />
}

Terminal = forwardRef(Terminal as any)

export default Terminal