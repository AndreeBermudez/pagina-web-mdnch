import { ChevronDown, Edit, Grip, PlusCircle, Trash2 } from 'lucide-react';
import type { MenuResponse } from '../schemas/menu.schema';
import { cn } from '../../../../core/utils/cn';
import { useState } from 'react';

type MenuItemProps = {
    menu: MenuResponse;
};

export const MenuItem = ({ menu }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='flex flex-col w-full px-4 py-2 overflow-hidden text-gray-400 bg-white border border-gray-300 rounded-lg shadow-md items-cemter'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <Grip className='w-4 h-4 border-2 border-gray-400 rounded-sm' />
                    <ChevronDown
                        className={cn(
                            'w-4 h-4 transition-transform duration-300',
                            (menu.hijos?.length ?? 0) > 0 ? 'cursor-pointer' : 'invisible cursor-none',
                            isOpen ? 'rotate-180' : 'rotate-0'
                        )}
                        onClick={handleClick}
                    />
                    <span className='text-base font-semibold text-black'>{menu.nombre}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <PlusCircle className='w-4 h-4 text-green-600 cursor-pointer' />
                    <Edit className='w-4 h-4 text-blue-600 cursor-pointer' />
                    <Trash2 className='w-4 h-4 text-red-600 cursor-pointer' />
                </div>
            </div>
            <div
                className={cn(
                    'ml-4 overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen && (menu.hijos?.length ?? 0) > 0
                        ? 'max-h-[1200px] opacity-100 mt-2'
                        : 'max-h-0 opacity-0 mt-0'
                )}
            >
                <div className='space-y-2'>
                    {menu.hijos?.map((hijo: MenuResponse) => (
                        <div
                            key={hijo.id}
                            className='flex items-center justify-between w-full px-4 py-2 transition-all duration-300 transform translate-y-0 bg-gray-100 rounded-md'>
                            <div className='flex items-center gap-2'>
                                <Grip className='w-4 h-4 border-2 border-gray-400 rounded-sm' />
                                <span className='text-base font-semibold text-gray-600'>{hijo.nombre}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Edit className='w-4 h-4 text-blue-600 cursor-pointer' />
                                <Trash2 className='w-4 h-4 text-red-600 cursor-pointer' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};