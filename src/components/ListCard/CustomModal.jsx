export const CustomModal = (props) => {
    const { close, isEditMode, name, addNameOfList, error, onSubmit } = props;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>
                    &times;
                </span>

                <h2>{isEditMode ? "Edit List" : "New List"}</h2>

                <div className="input-name-wrapper" >
                    <label>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={addNameOfList}
                        className=""
                        placeholder={error ? "please fill in the field" : ""}
                    />
                </div>
                {props.children}
                <button onClick={close}>Close</button>
                <button disabled={error} onClick={onSubmit}>Save</button>
            </div>
        </div>
    )

}