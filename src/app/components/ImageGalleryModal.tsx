import React from 'react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ preview: string } | string>;
  selectedIndex: number;
  onSelectImage: (index: number) => void;
  onRemoveImage: (index: number) => void;
}

const ImageGalleryModal = React.forwardRef<HTMLDivElement, ImageGalleryModalProps>(
  (
    {
      isOpen,
      onClose,
      images,
      selectedIndex,
      onSelectImage,
      onRemoveImage,
    },
    ref
  ) => {
    if (!isOpen) return null;

    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newIndex = (selectedIndex - 1 + images.length) % images.length;
      onSelectImage(newIndex);
    };

    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newIndex = (selectedIndex + 1) % images.length;
      onSelectImage(newIndex);
    };

    const handleRemove = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      if (window.confirm('Remover esta imagem?')) {
        onRemoveImage(index);
      }
    };

    const getImageSrc = (image: { preview: string } | string) => {
      return typeof image === 'string' ? image : image.preview;
    };

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão fechar */}
          <button
            className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Imagem principal */}
          <div className="relative">
            <img
              src={getImageSrc(images[selectedIndex])}
              alt="Ampliada"
              className="w-full h-[60vh] object-contain bg-gray-100"
            />

            {/* Navegação */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg transition-colors"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg transition-colors"
              onClick={handleNext}
            >
              ›
            </button>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative flex-shrink-0 cursor-pointer ${
                  index === selectedIndex ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => onSelectImage(index)}
              >
                <img
                  src={getImageSrc(image)}
                  alt={`Miniatura ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  onClick={(e) => handleRemove(e, index)}
                  title="Remover imagem"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ImageGalleryModal.displayName = 'ImageGalleryModal';

export default ImageGalleryModal;