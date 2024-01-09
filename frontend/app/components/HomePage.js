const Body = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-white p-0 m-0">
      <div className="container mx-auto pt-[20px]">
        <div className="lg:flex">
          <div className="lg:w-[60%] text-black mt-[40px] pb-[40px] prose">
            <h1 className="text-[48px] leading-[58px] font-bold mb-4">
              Mision
            </h1>
            <p className="text-[15px] leading-[20px] font-normal mt-[15px] w-[80%]">
              redi existe para servir como base invisible que optimiza y unifica
              proyectos, líderes y comunidades cuyas acciones son congruentes a
              la experiencia del despertar humano a la consciencia, el amor y la
              dicha.
            </p>
            <h1 className="text-[48px] leading-[58px] font-bold mt-[20px] mb-4">
              Vision
            </h1>
            <p className="text-[15px] leading-[20px] font-normal mt-[30px] w-[80%]">
              redi manifiesta ser inspiración constante para que el ser y la
              acción humana, desde el amor, la cooperación y la armonía,
              disminuyan a su máxima expresión las causas del sufrimiento
              innecesario; principalmente, las sectas, la ignorancia y la
              pobreza.
            </p>
          </div>
          <div className="lg:w-[40%] lg:ml-8">
            <img src="./yin-yang1.png" className="z-10 w-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
