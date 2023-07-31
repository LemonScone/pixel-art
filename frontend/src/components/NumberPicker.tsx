type NumberPickerProps = {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const NumberPicker = ({
  name,
  value,
  minValue,
  maxValue,
  onIncrease,
  onDecrease,
}: NumberPickerProps) => {
  return (
    <>
      <label htmlFor={name} className="w-1/3 text-sm text-gray-100">
        {name}
      </label>
      <div className="relative mt-1 flex w-2/3 flex-row  rounded-lg bg-transparent">
        <button
          className="w-1/3  cursor-pointer rounded-l bg-input-color text-gray-600 outline-none  hover:bg-input-color-hover focus:ring-2 focus:ring-white"
          onClick={() => {
            if (value > minValue) {
              onDecrease();
            }
          }}
        >
          <span className="m-auto text-lg font-thin text-gray-100">-</span>
        </button>
        <input
          id={name}
          type="number"
          className="w-full bg-input-color text-center text-sm text-gray-100  focus:outline-none"
          value={value}
          disabled
        ></input>
        <button
          className="w-1/3 cursor-pointer rounded-r bg-input-color text-gray-600 outline-none  hover:bg-input-color-hover focus:ring-2 focus:ring-white"
          onClick={() => {
            if (value < maxValue) {
              onIncrease();
            }
          }}
        >
          <span className="m-auto text-lg font-thin text-gray-100">+</span>
        </button>
      </div>
    </>
  );
};

export default NumberPicker;
