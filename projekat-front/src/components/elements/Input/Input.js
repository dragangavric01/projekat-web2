import './Input.css';

export const InputType = {
    TEXT: 0,
    PASSWORD: 1,
    DATE:2,
    DROPDOWN:3
};


export default function Input({name, type, dropdownOptions}) {
    if (type == InputType.TEXT) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <TextInput id={name}/>
            </div>
        );
    } else if (type == InputType.PASSWORD) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <PasswordInput id={name}/>
            </div>
        );
    } else if (type == InputType.DATE) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <DateInput id={name}/>
            </div>
        );
    } else if (type == InputType.DROPDOWN) {
        return (
            <div class="input-field">
                <InputName name={name}/>
                <DropdownInput id={name} options={dropdownOptions}/>
            </div>
        );
    }
}

function InputName({name}) {
    return (
        <label for={name}>{name}:</label>
    );
}

function TextInput({id}) {
    return (
        <input id={id} type="text"/>
    );
}

function PasswordInput({id}) {
    return (
        <input id={id} type="password"/>
    );
}

function DateInput({id}) {
    return (
        <input id={id} type="date"/>
    );
}

function DropdownInput({id, options}) {
    const selectOptions = options.map((option, index) => (
        <option key={index} value={option}>
            {option}
        </option>
    ));

    return (
        <select id={id}>
            {selectOptions}
        </select>
    );
}