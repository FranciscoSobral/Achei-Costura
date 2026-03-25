import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import type { Service } from '../types';
import { ServiceCard } from './ServiceCard';
import { fetchFeaturedServices } from '../services/api';
import { Skeleton } from './ui/skeleton';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
      style={{ right: '-12px' }}
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
      style={{ left: '-12px' }}
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );
};

export const FeaturedCarousel = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        const data = await fetchFeaturedServices();
        setServices(data);
      } catch (error) {
        console.error('Erro ao carregar serviços em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedServices();
  }, []);

  const settings = {
    dots: true,
    infinite: services.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: services.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: services.length > 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-semibold">Serviços em Destaque</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        <h2 className="text-2xl font-semibold">Serviços em Destaque</h2>
      </div>

      <div className="px-8">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="px-3">
              <ServiceCard service={service} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
