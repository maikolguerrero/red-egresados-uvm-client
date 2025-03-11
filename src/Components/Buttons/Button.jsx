function Button(props) {
  return (
    <>
      <button
        onClick={props.action}
        className={"bg-verdeA text-Blanco px-7 py-1 font-barlow-condensed font-bold rounded-3xl text-sm md:text-base hover:bg-RojoC transition-all duration-300 " + props.className}
        style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
      >
        {props.text}
      </button>
    </>
  );
}

export default Button;
