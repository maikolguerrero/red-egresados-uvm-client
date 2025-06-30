function ButtonBig(props) {
  return (
    <>
      <button
        onClick={props.action}
        className={
          "text-Blanco px-6 py-2 uppercase font-barlow-condensed font-medium rounded-2xl text-base md:text-lg transition-all duration-300 " +
          props.className
        }
        style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
      >
        {props.text}
      </button>
    </>
  );
}

export default ButtonBig;