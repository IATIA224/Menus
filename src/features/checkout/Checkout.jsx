import React, { useState } from 'react';
import { X, CreditCard, Wallet, MapPin, Phone, User, CheckCircle, Truck, UtensilsCrossed, ArrowLeft } from 'lucide-react';

const Checkout = ({ isOpen, onClose, items, onConfirmOrder }) => {
  const [step, setStep] = useState(1); // 1: Order Type, 2: Checkout Form
  const [orderType, setOrderType] = useState(''); // 'delivery' or 'dine-in'
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    tableNumber: '',
    notes: ''
  });
  const [gcashNumber, setGcashNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation based on order type
    if (!customerInfo.name) {
      alert('Please enter your name');
      return;
    }

    if (orderType === 'delivery') {
      if (!customerInfo.phone || !customerInfo.address) {
        alert('Please fill in phone number and delivery address');
        return;
      }
    } else if (orderType === 'dine-in') {
      if (!customerInfo.tableNumber) {
        alert('Please enter your table number');
        return;
      }
    }

    if (paymentMethod === 'gcash' && !gcashNumber) {
      alert('Please enter your GCash number');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      
      // Call the parent callback
      if (onConfirmOrder) {
        onConfirmOrder({
          orderType,
          customerInfo,
          paymentMethod,
          gcashNumber: paymentMethod === 'gcash' ? gcashNumber : null,
          items,
          total
        });
      }

      // Reset form after 3 seconds and close
      setTimeout(() => {
        handleReset();
      }, 3000);
    }, 2000);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    setStep(1);
    setOrderType('');
    setCustomerInfo({ name: '', phone: '', address: '', tableNumber: '', notes: '' });
    setGcashNumber('');
    setPaymentMethod('cash');
    onClose();
  };

  const handleBack = () => {
    setStep(1);
    setOrderType('');
  };

  // Order Confirmation Screen
  if (orderConfirmed) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce-in">
            <div className="mb-6">
              <CheckCircle size={80} className="text-green-500 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your order, {customerInfo.name}!
            </p>
            <p className="text-sm text-gray-500">
              Your order will be prepared shortly.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Checkout Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-700 to-amber-800">
              {step === 2 && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-white/20 rounded-lg transition mr-2"
                >
                  <ArrowLeft size={24} className="text-white" />
                </button>
              )}
              <h2 className="text-2xl font-bold text-white">
                {step === 1 ? 'Choose Order Type' : orderType === 'delivery' ? 'Delivery Checkout' : 'Dine-In Checkout'}
              </h2>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 ? (
                // STEP 1: Order Type Selection
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">How would you like to receive your order?</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Delivery Option */}
                    <button
                      onClick={() => {
                        setOrderType('delivery');
                        setStep(2);
                        setPaymentMethod('cod');
                      }}
                      className="group relative overflow-hidden rounded-2xl border-2 border-gray-300 hover:border-amber-600 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="p-8 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="p-6 bg-amber-100 rounded-full group-hover:bg-amber-200 transition">
                            <Truck size={64} className="text-amber-700" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Delivery</h3>
                        <p className="text-gray-600 mb-4">We'll deliver to your address</p>
                        <div className="text-sm text-gray-500">
                          <p>• Delivery fee: ₱50</p>
                          <p>• Payment: COD or GCash</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    {/* Dine-In Option */}
                    <button
                      onClick={() => {
                        setOrderType('dine-in');
                        setStep(2);
                        setPaymentMethod('cash');
                      }}
                      className="group relative overflow-hidden rounded-2xl border-2 border-gray-300 hover:border-green-600 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="p-8 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="p-6 bg-green-100 rounded-full group-hover:bg-green-200 transition">
                            <UtensilsCrossed size={64} className="text-green-700" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Dine-In</h3>
                        <p className="text-gray-600 mb-4">Enjoy at our restaurant</p>
                        <div className="text-sm text-gray-500">
                          <p>• No delivery fee</p>
                          <p>• Payment: Cash or GCash</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>

                  {/* Order Summary Preview */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} x{item.quantity}</span>
                          <span className="font-semibold text-gray-800">₱{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-gray-800">
                          <span>Subtotal</span>
                          <span className="text-amber-700">₱{subtotal.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // STEP 2: Checkout Form (Delivery or Dine-In)
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Side - Order Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-6">
                      {items.map(item => (
                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                            <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-700">₱{(item.price * item.quantity).toFixed(0)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₱{subtotal.toFixed(0)}</span>
                      </div>
                      {orderType === 'delivery' && (
                        <div className="flex justify-between text-gray-600">
                          <span>Delivery Fee</span>
                          <span>₱{deliveryFee.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-amber-700">₱{total.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Customer Info & Payment */}
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Customer Information */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {orderType === 'delivery' ? 'Delivery Information' : 'Customer Information'}
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <User size={16} className="inline mr-1" />
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={customerInfo.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="Juan Dela Cruz"
                              required
                            />
                          </div>

                          {orderType === 'delivery' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  <Phone size={16} className="inline mr-1" />
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={customerInfo.phone}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                  placeholder="09XX XXX XXXX"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  <MapPin size={16} className="inline mr-1" />
                                  Delivery Address *
                                </label>
                                <textarea
                                  name="address"
                                  value={customerInfo.address}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                  placeholder="Street, Barangay, City"
                                  rows="2"
                                  required
                                ></textarea>
                              </div>
                            </>
                          )}

                          {orderType === 'dine-in' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                <UtensilsCrossed size={16} className="inline mr-1" />
                                Table Number *
                              </label>
                              <input
                                type="text"
                                name="tableNumber"
                                value={customerInfo.tableNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="e.g., Table 5"
                                required
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Order Notes (Optional)
                            </label>
                            <textarea
                              name="notes"
                              value={customerInfo.notes}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="Special instructions for your order"
                              rows="2"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
                        
                        <div className="space-y-3">
                          {/* Cash Payment Option */}
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                              paymentMethod === (orderType === 'delivery' ? 'cod' : 'cash')
                                ? 'border-amber-600 bg-amber-50'
                                : 'border-gray-300 hover:border-amber-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={orderType === 'delivery' ? 'cod' : 'cash'}
                              checked={paymentMethod === (orderType === 'delivery' ? 'cod' : 'cash')}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-amber-600"
                            />
                            <div className="ml-3 flex items-center">
                              <CreditCard size={24} className="text-amber-700 mr-2" />
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {orderType === 'delivery' ? 'Cash on Delivery' : 'Cash Payment'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {orderType === 'delivery' 
                                    ? 'Pay with cash when you receive your order' 
                                    : 'Pay with cash at the counter'}
                                </p>
                              </div>
                            </div>
                          </label>

                          {/* GCash Payment Option */}
                          <label
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                              paymentMethod === 'gcash'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value="gcash"
                              checked={paymentMethod === 'gcash'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <div className="ml-3 flex items-center">
                              <Wallet size={24} className="text-blue-600 mr-2" />
                              <div>
                                <p className="font-semibold text-gray-800">GCash</p>
                                <p className="text-sm text-gray-600">Pay securely with GCash e-wallet</p>
                              </div>
                            </div>
                          </label>

                          {/* GCash Number Input */}
                          {paymentMethod === 'gcash' && (
                            <div className="mt-3 pl-4 animate-slide-down">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                GCash Mobile Number *
                              </label>
                              <input
                                type="tel"
                                value={gcashNumber}
                                onChange={(e) => setGcashNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="09XX XXX XXXX"
                                required
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                You will receive a payment request via GCash
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ${
                          isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : orderType === 'delivery'
                            ? 'bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900'
                            : 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900'
                        }`}
                      >
                        {isProcessing ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Order...
                          </span>
                        ) : (
                          `Place Order - ₱${total.toFixed(0)}`
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  );
};

export default Checkout;
