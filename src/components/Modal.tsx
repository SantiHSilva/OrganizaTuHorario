import { useEffect, useRef, ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onOpen?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export const Modal = ({ isOpen, onClose, children, onOpen, size = 'sm' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Evitar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // al abrir el modal, ejecutar la función onOpen si está definida
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isOpen) return null;

  let modalSizeClass = '';

  switch (size) {
    case 'sm':
      modalSizeClass = 'max-w-sm';
      break;
    case 'md':
      modalSizeClass = 'max-w-md';
      break;
    case 'lg':
      modalSizeClass = 'max-w-lg';
      break;
    case 'xl':
      modalSizeClass = 'max-w-xl';
      break;
    default:
      modalSizeClass = 'max-w-md';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/50 blur-sm bg-opacity-50 transition-opacity"></div>
      
      {/* Contenedor del modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          ref={modalRef}
          className={`bg-white dark:bg-[#212529] rounded-lg shadow-xl transform transition-all ${modalSizeClass} w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
