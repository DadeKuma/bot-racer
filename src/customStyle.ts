export const selectStyle = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: 0,
        borderColor: state.isFocused ? '#ffcc00' : provided.borderColor,
        backgroundColor: "#444",
        color: state.selectProps.inputValue ? '#fff' : '#444',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#ffcc00' : "#555",
        color: "#fff",
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: "#fff",
    }),
    input: (provided: any) => ({
        ...provided,
        color: "#fff",
    }),
    noOptionsMessage: (provided: any) => ({
        ...provided,
        backgroundColor: "#555",
        color: "#fff",
    }),
    menu: (provided: any) => ({
        ...provided,
        background: "#444"
    }),
};
