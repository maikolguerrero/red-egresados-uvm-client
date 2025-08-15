function ButtonSmall(props) {
  return (
    <>
      <button
        onClick={props.action}
        className={
          "text-Blanco px-5 py-1 uppercase font-barlow-condensed font-medium rounded-2xl text-xs md:text-sm transition-all duration-300 " +
          props.className
        }
        style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
      >
        {props.text}
      </button>
    </>
  );
}

export default ButtonSmall;
