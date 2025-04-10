import React, { useState, useRef, useEffect } from 'react';
import { IoChevronForward } from "react-icons/io5";
type DropdownItem = {
  label: string;
  action?: () => void;
  items?: DropdownItem[];
};

type DropdownDirection = 'left' | 'right';

interface DropdownMenuProps {
  items: DropdownItem[];
  direction?: DropdownDirection;
  children: React.ReactNode;
  hoverDelay?: number;
  openOnHover?: boolean;
  title?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  direction = 'left',
  children,
  hoverDelay = 200,
  openOnHover = false,
  title = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const openDropdown = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const closeDropdown = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, hoverDelay);
  };

  const openSubmenu = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveSubmenu(index);
  };

  const closeSubmenu = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, hoverDelay);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative inline-block ${direction === 'right' ? 'text-right' : 'text-left'}`}
      ref={dropdownRef}
      onMouseEnter={openOnHover ? openDropdown : undefined}
      onMouseLeave={openOnHover ? closeDropdown : undefined}
    >
      <div
        className="cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          if (openOnHover) return;
          setIsOpen((prev) => !prev);
        }}
        onMouseEnter={() => {
          if (openOnHover) openDropdown();
        }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className={`absolute ${direction === 'right' ? 'right-0' : 'left-0'} mt-2 min-w-[220px] bg-white dark:bg-[#0b0c10] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50`}
          role="menu"
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          }}
          onMouseLeave={closeDropdown}
        >
          {title && (
            <p className='dark:text-white text-right w-full justify-start items-start flex px-4 pt-3 text-base'>
              {title}
            </p>
          )}
          <div className="py-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative px-4 m-1 py-2 text-base rounded-full text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-[#111217] hover:text-gray-800 cursor-pointer flex justify-between items-center ${
                  item.items ? 'pr-8' : ''
                }`}
                onClick={() => !item.items && item.action?.()}
                onMouseEnter={() => item.items && openSubmenu(index)}
                onMouseLeave={() => item.items && closeSubmenu()}
                role="menuitem"
              >
                {item.label}
                {item.items && (
                  <IoChevronForward
                    className={`absolute right-2`}
                  />
                )}

                {item.items && activeSubmenu === index && (
                  <div
                    className={`absolute top-0 ${
                      direction === 'right' ? 'right-full mr-1' : 'left-full ml-1'
                    } min-w-[220px] bg-white dark:bg-[#0b0c10] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50`}
                    role="menu"
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    }}
                    onMouseLeave={closeSubmenu}
                  >
                    {item.items.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-4 m-1 py-2 text-base rounded-full text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-[#111217] hover:text-gray-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          subItem.action?.();
                        }}
                        role="menuitem"
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;