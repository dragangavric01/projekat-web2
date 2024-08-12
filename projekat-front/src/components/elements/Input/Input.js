import './Input.css';

export const InputType = {
    TEXT: 0,
    PASSWORD: 1,
    DATE:2,
    DROPDOWN:3
};


export default function Input({name, type, handleChangeFunction, dropdownOptions}) {
    if (type == InputType.TEXT) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <TextInput id={name} handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    } else if (type == InputType.PASSWORD) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <PasswordInput id={name} handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    } else if (type == InputType.DATE) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <DateInput id={name} handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    } else if (type == InputType.DROPDOWN) {
        return (
            <div class="input-field">
                <InputName name={name} />
                <DropdownInput id={name} options={dropdownOptions} handleChangeFunction={handleChangeFunction}/>
            </div>
        );
    }
}

function InputName({name}) {
    return (
        <label for={name}>{name}:</label>
    );
}

function TextInput({id, handleChangeFunction}) {
    return (
        <input id={id} type="text" onChange={handleChangeFunction}/>
    );
}

function PasswordInput({id, handleChangeFunction}) {
    return (
        <input id={id} type="password" onChange={handleChangeFunction}/>
    );
}

function DateInput({id, handleChangeFunction}) {
    return (
        <input id={id} type="date" onChange={handleChangeFunction}/>
    );
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