import React from 'react';

export function ConfirmationModal({handleCancel, handleContinue}) {

    return (
        <div className='lightbox'>
            <div className='modal'>
                <p>
                    You have not saved the changes you made. If you continue, you will lose the changes.
                </p>
                <div>
                    <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                    <button onClick={handleContinue} className='continue-button'>Continue</button>
                </div>
            </div>
        </div>
    )
}