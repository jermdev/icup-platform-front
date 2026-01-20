import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { MiembroPastoral } from "@/types";

import MiembroPastoralCard from "./MiembroPastoralCard";

type Props = {
  item?: JSX.Element[];
}

export default function Carrusel({ item }: Props) {    
  
  
  // const childrenArray = React.Children.toArray(children);
  const MiembroPastorales: MiembroPastoral[] = [
    {id: '1', nombre : "Margarita Angeles Tolentino", descripcion: "Descripcion de Julia", rol: "Ps"},
    {id: '2', nombre : "Michael Perez Gomez", descripcion: "Descripcion de Michael", rol: "Ps"},
    {id: '3', nombre : "Ana Lopez Martinez", descripcion: "Descripcion de Ana", rol: "Co-Ps"},
    {id: '4', nombre : "Carmen Rodriguez Diaz", descripcion: "Descripcion de Carmen", rol: "Co-Ps"},
    {id: '5', nombre : "Luisa Hernandez Sanchez", descripcion: "Descripcion de Luisa", rol: "Co-Ps"},
    ]
  
  return (
    <div className="multiple-slide-carousel mx-auto max-w-6xl relative">
      <Swiper

        modules={[Navigation]}
        loop={true}
        // centeredSlides={true}
        slidesPerView={3}
        slidesOffsetBefore={145}
        slidesOffsetAfter={50}
        spaceBetween={50}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        navigation={{
          nextEl: ".multiple-slide-carousel .swiper-button-next",
          prevEl: ".multiple-slide-carousel .swiper-button-prev",
        }}
        breakpoints={{
          0: { 
            slidesPerView: 1,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16, 
          },
          1028: { 
            slidesPerView: 2,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
          },
          1440: {
            slidesPerView: 3,
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
          },
        }}
        >
        {
          

            MiembroPastorales.map((info) => (
            <SwiperSlide key={info.id}  className="flex items-center justify-center">
               <MiembroPastoralCard key={info.id} {...info} />
            </SwiperSlide>
          ))
        
      }
        
        <div className="swiper-button-prev pr-5" />
        <div className="swiper-button-next pl-3.5"/>
      </Swiper>
    </div>
  );
}