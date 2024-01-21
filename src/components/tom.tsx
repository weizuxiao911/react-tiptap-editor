import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";


export const Tom = (props: any) => {

    const { editor } = props

    const [heading, setHeading] = useState<any[]>([])

    const update = (props: any) => {
        const json = editor?.getJSON()
        if (!json || !json?.content) return 
        const h = json?.content?.filter((it: any) => 'heading' === it?.type)
        setHeading(h)
    }

    useEffect(() => {
        if (editor) {
            editor?.on('update', update)
        }
        return () => {
            if (editor) {
                editor?.off('update', update)
            }
        }
    }, [editor])

    return <div>
        {
            // todo beautify
            heading?.map((it: any, index: number) => {
                return <div key={index}>{it?.content?.[0]?.text}</div>
            })
        }
    </div>

}