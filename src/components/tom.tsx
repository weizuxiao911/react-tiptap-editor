import './style.scss'
import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";


export const Tom = (props: any) => {

    const { editor } = props

    const [heading, setHeading] = useState<any[]>([])

    const update = (props: any) => {
        const children = editor?.view?.docView?.children
        if (!children) return
        const h = children?.filter((child: any) => 'heading' === child?.node?.type?.name)?.map((it: any) => {
            return {
                from: it?.posAtStart,
                to: it?.posAtEnd,
                text: it?.node?.textContent,
                level: it?.node?.attrs?.level
            }
        })
        setHeading(h)
    }

    const scrollTo = (heading: any) => {
        console.log(editor, heading)
        editor?.chain()?.focus(heading?.from + heading?.text?.length).run()
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
                return <div key={index}
                    className={['title', `h${it?.level}`].join(' ')}
                    onClick={() => { scrollTo(it) }}>
                    {it?.text}
                </div>
            })
        }
    </div>

}