import { Extension } from "@tiptap/core"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        customkeymap: {
            selectTextWithinNodeBoundaries: () => ReturnType
        }
    }
}

export const Selection = Extension.create({
    name: "selection",

    addCommands() {
        return {
            selectTextWithinNodeBoundaries: () => ({ editor, commands }) => {
                const { state } = editor
                const { tr } = state
                const startNodePos = tr.selection.$from.start()
                const endNodePos = tr.selection.$to.end()
                const success = commands.setTextSelection({
                    from: startNodePos,
                    to: endNodePos,
                })
                return success
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            "Mod-a": ({ editor }) => {
                const { state } = editor
                const { tr } = state
                const startSelectionPos = tr.selection.from
                const endSelectionPos = tr.selection.to
                const startNodePos = tr.selection.$from.start()
                const endNodePos = tr.selection.$to.end()
                const isCurrentTextSelectionNotExtendedToNodeBoundaries =
                    startSelectionPos > startNodePos || endSelectionPos < endNodePos
                let success = false
                if (isCurrentTextSelectionNotExtendedToNodeBoundaries) {
                    editor.chain().selectTextWithinNodeBoundaries().run()
                    success = true
                }
                setTimeout(() => {
                    editor.chain().hideBubbleMenu().run() // 键盘事件互斥
                }, 100)
                return success
            },
        }
    },
})
