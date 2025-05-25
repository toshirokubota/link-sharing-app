
export function ConfirmationModal({handleCancel, handleContinue}
    : {handleCancel: ()=>void, handleContinue: ()=>void}
) {

    return (
        <div className='lightbox'>
            <div className='lightbox-modal'>
                <p>
                    You have not saved the changes you made. If you continue, you will lose the changes.
                </p>
                <div className='modal-buttons'>
                    <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                    <button onClick={handleContinue} className='continue-button'>Continue</button>
                </div>
            </div>
        </div>
    )
}