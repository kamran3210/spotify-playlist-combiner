import { useRecoilState } from "recoil";
import { selectedActionState } from "../../atoms/selectedActionAtom";

const actions = [
    { name: "Union", state: 0 },
    { name: "Intersection", state: 1 },
    { name: "Difference", state: 2 },
    { name: "Symmetric Difference", state: 3 },
];

function ActionButtons() {

    const [selectedAction, setSelectedAction] = useRecoilState(selectedActionState);

    function isSelected(actionState) {
        return actionState === selectedAction;
    }

    return (
        <div className="flex bg-gray-800 rounded-lg shadow-lg h-10">

            {actions.map((action) => (
                <div key={action.name}
                    onClick={() => setSelectedAction(action.state)}
                    className={
                        "px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer ".concat(isSelected(action.state) ? "bg-blue-600" : "hover:text-blue-200")
                    } >
                    <p>
                        {action.name}
                    </p>
                </div>
            ))}

        </div>
    )
}

export default ActionButtons
