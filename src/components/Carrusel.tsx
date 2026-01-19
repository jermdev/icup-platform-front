
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function Carrusel() {    

    return (
    <div className="multiple-slide-carousel mx-auto max-w-6xl relative">
      <Swiper

        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
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
          [1,2,3,4,5,6,7].map((item) => (
            <SwiperSlide key={item} className="flex items-center justify-center">
              
              <div className="bg-gray-200 max-h-full rounded">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id lorem est. Vestibulum felis odio, ornare nec metus vitae, mollis tincidunt magna. Nullam vel augue lacus. Fusce sed dolor placerat, consectetur nisi ut, feugiat ex. Etiam eros massa, semper ut ante nec, fringilla blandit mauris. Nam ex leo, sollicitudin ac sodales vel, auctor in turpis. Morbi sit amet mi eu metus varius ullamcorper ac vitae magna. Aenean in augue gravida, mattis metus vitae, consectetur nisl. Aliquam auctor elit ac elementum sollicitudin. Nam lobortis, mi quis gravida volutpat, lacus est sollicitudin orci, at volutpat libero ex in magna. Nunc in interdum leo, et dictum augue. Morbi mi elit, commodo sit amet sapien a, ultrices scelerisque nibh.
              </div>
            </SwiperSlide>
          ))
        }
        

        <div className="swiper-button-prev pr-5" />
        <div className="swiper-button-next pl-3.5"/>
      </Swiper>
    </div>
  );
}