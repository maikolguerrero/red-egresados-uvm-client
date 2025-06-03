function ButtonNormal(props) {
  return (
    <>
      <span class={`${props.color} text-Blanco text-[9px] md:text-xs lg:text-sm font-barlow-condensed px-2 py-1 rounded-md`}>
        {props.text}
      </span>
    </>
  );
}

export default ButtonNormal;
