function ButtonNormal(props) {
  return (
    <>
      <span class={`${props.color} text-Blanco text-xs md:text-sm lg:text-base font-barlow-condensed px-4 py-2 rounded-md`}>
        {props.text}
      </span>
    </>
  );
}

export default ButtonNormal;
