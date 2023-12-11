const Form = ({ children, className, ...props }) => {
  return (
    <form
      {...props}
      className={`${className} grid place-content-center gap-5 py-6 items-center border
       border-royal-blue-400 px-4 rounded overflow-hidden  bg-slate-50`}
    >
      {children}
    </form>
  );
};

const FieldSet = ({ children, className, ...props }) => {
  return (
    <fieldset
      {...props}
      className={`${className} grid gap-5 py-6 items-center px-4`}
    >
      {children}
    </fieldset>
  );
};

const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`${className} [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-1 block text-slate-900 px-4 py-2 rounded border bg-slate-100  border-royal-blue-400 focus:outline-none focus:ring focus:ring-royal-blue-600 active:bg-slate-200`}
    ></input>
  );
};

Form.FieldSet = FieldSet;
Form.Input = Input;

export default Form;
