import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#12110F]/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EE] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#E7DBC9]">
          
          {/* Header Ébano & Ouro */}
          <div className="p-5 border-b border-[#5C4A33]/30 flex items-center justify-between bg-[#12110F] text-[#FAF6EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B8966B]" />
              <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-[#FAF6EE]">Sua Sacola</h2>
              <span className="text-[11px] bg-[#B8966B] text-[#12110F] font-bold px-2 py-0.5 rounded-sm">
                {items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#FAF6EE]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#12110F] border border-[#E7DBC9]">
                  <ShoppingBag className="w-8 h-8 text-[#B8966B]" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#12110F] uppercase">Sua sacola está vazia</h3>
                <p className="text-xs text-[#5C4A33] max-w-xs mx-auto">
                  Explore nossos perfumes importados, bolsas de grife, skincare e moda infantil.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl border border-[#E7DBC9] bg-white hover:border-[#B8966B] transition-colors shadow-xs"
                >
                  <img
                    src={item.product.images[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=200&q=80'}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F4ECE1] border border-[#E7DBC9] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#94734B] tracking-wider block">
                        {item.product.brand}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-[#12110F] line-clamp-1 uppercase">
                        {item.product.name}
                      </h4>
                      <p className="font-heading text-sm font-bold text-[#12110F] mt-1">
                        R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7DBC9]">
                      <div className="flex items-center border border-[#E7DBC9] rounded-md bg-[#FAF6EE]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#12110F] hover:text-[#B8966B] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#12110F]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 text-[#12110F] hover:text-[#B8966B] disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7DBC9] bg-[#F4ECE1] space-y-4">
              <div className="space-y-1.5 text-xs text-[#12110F]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-heading text-lg font-bold text-[#12110F]">
                    R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#5C4A33]">
                  <span>Frete</span>
                  <span>Calculado no Checkout</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#12110F] hover:bg-[#25221E] text-[#FAF6EE] rounded-md font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer border border-[#B8966B]/30"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4 text-[#B8966B] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5C4A33]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra segura com InfinitePay e entrega rastreada</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
