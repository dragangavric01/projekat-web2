import './Input.css';

export const InputType = {
    TEXT: 0,
    PASSWORD: 1,
    DATE:2,
    DROPDOWN:3,
    PICTURE:4
};


export default function Input({name, type, handleChangeFunction, dropdownOptions, initialValue, placeholder}) {
    if (type == InputType.TEXT) {
        return (
            <div className="input-field">
                <InputName name={name}/>
                <TextInput id={name} handleChangeFunction={handleChangeFunction} initialValue={initialValue}/>
            </div>
        );
    } else if (type == InputType.PASSWORD) {
        return (
            <div className="input-field">
                <InputName name={name}/>
                <PasswordInput id={name} handleChangeFunction={handleChangeFunction} placeholder={placeholder}/>
            </div>
        );
    } else if (type == InputType.DATE) {
        return (
            <div className="input-field">
                <InputName name={name}/>
                <DateInput id={name} handleChangeFunction={handleChangeFunction} initialValue={initialValue}/>
            </div>
        );
    } else if (type == InputType.DROPDOWN) {
        return (
            <div className="input-field">
                <InputName name={name} />
                <DropdownInput id={name} options={dropdownOptions} handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    } else if (type == InputType.PICTURE) {
        return (
            <div className="input-field">
                <InputName name={name} />
                <PictureInput handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    }
}

function InputName({name}) {
    return (
        <label for={name} style={{fontWeight: '600'}}>{name}:</label>
    );
}

function TextInput({id, handleChangeFunction, initialValue}) {
    if (initialValue == null) {
        return (
            <input id={id} type="text" onChange={handleChangeFunction}/>
        );
    } else {
        return (
            <input id={id} type="text" onChange={handleChangeFunction}  value={initialValue}/>
        );
    }
}

function PasswordInput({id, handleChangeFunction, placeholder}) {
    return (
        <input id={id} type="password" placeholder={placeholder} onChange={handleChangeFunction} />
    );
}

function DateInput({id, handleChangeFunction, initialValue}) {
    if (initialValue == null) {
        return (
            <input id={id} type="date" onChange={handleChangeFunction} />
        );
    } else {
        return (
            <input id={id} type="date" onChange={handleChangeFunction}  value={initialValue}/>
        );
    }
}

function DropdownInput({id, options, handleChangeFunction}) {
    const selectOptions = options.map((option, index) => (
        <option key={index} value={option}>
            {option}
        </option>
    ));

    return (
        <select id={id}  onChange={handleChangeFunction}>
            {selectOptions}
        </select>
    );
}

function PictureInput({handleChangeFunction}) {
    return (
        <input type='file' accept='image/*' onChange={handleChangeFunction} style={{width: '250px'}}/>
    );
}