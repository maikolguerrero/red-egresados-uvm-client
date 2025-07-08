function ButtonNormal(props) {
  return (
    <>
      <span className={`${props.color} text-Blanco text-xs md:text-sm lg:text-base font-barlow-condensed px-2 py-1 rounded-md`}>
        {props.text}
      </span>
    </>
  );
}

export default ButtonNormal;
