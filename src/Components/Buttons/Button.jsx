function Button(props) {
  return (
    <>
      <button
        className="bg-verdeA text-Blanco px-7 py-1 font-barlow-condensed font-bold rounded-3xl text-lg hover:bg-RojoC transition-all duration-300"
        style={{ boxShadow: "inset -3px -5px 7px  rgba(0, 0, 0, .4)" }}
      >
        {props.text}
      </button>
    </>
  );
}

export default Button;
