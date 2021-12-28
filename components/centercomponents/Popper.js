import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { useRecoilState } from 'recoil';
import { selectedActionState } from '../../atoms/playlistsAtom';

function Popper({ text, state, tooltip }) {
    const refEl= useRef();
    const popperEl = useRef();
    const { styles, attributes } = usePopper(refEl.current, popperEl.current, {
        placement: "top-start", 
        modifiers: [
            { 
                name: "offset", 
                options: { 
                    offset: [0, 5]
                } 
            },
        ],
    });

    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedAction, setSelectedAction] = useRecoilState(selectedActionState);
    

    function isSelected(actionState) {
        return actionState === selectedAction;
    }

    return (
        <>
            <button ref={refEl}
                onClick={() => setSelectedAction(state)}
                onMouseOver={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={
                    `px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer ${isSelected(state) ? "bg-blue-600" : "hover:text-blue-200"}`
                } >
                {text}
            </button>

            <div ref={popperEl} style={styles.popper} {...attributes.popper}
                className={`bg-gray-800 bg-opacity-80 p-2 rounded-lg ${!showTooltip && "hidden"}`}>
                {tooltip}
            </div>
        </>
    );
}

export default Popper