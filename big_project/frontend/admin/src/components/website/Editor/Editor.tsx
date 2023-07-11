import React from "react";
import { Editor, EditorState } from "draft-js";

export function EditorApp() {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor();
    }, []);

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={(editorState) => setEditorState(editorState)}
            />
        </div>
    );
}
