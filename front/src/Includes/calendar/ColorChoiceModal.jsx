import { SwatchesPicker } from "react-color";
import ReactModal from "react-modal";

function ColorChoiceModal({
    colorChoiceVisible, 
    colorChoiceClose, 
    scheduleColor, 
    setScheduleColor}){

    const colorChange = (color) => {
        setScheduleColor(color.hex)
        colorChoiceClose()
    }

    return(
        <div style={{textAlign:'cetner'}}>
            <ReactModal
                isOpen={colorChoiceVisible}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        zIndex: 1001},
                    content: {
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        border: 'none',
                        background: 'transparent'}}}
                    closeTimeoutMS={200}>
               
                <div >
                    <SwatchesPicker 
                        style={{ width:'20vw'}}
                        color={scheduleColor} 
                        onChangeComplete={colorChange}/>
                </div>
            </ReactModal>
        </div>
    )
}

export default ColorChoiceModal;