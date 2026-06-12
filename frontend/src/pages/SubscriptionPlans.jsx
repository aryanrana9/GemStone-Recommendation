import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';
import { CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Star, HelpCircle } from 'lucide-react';
import { Skeleton } from '../components/UI/Skeleton';
import Modal from '../components/UI/Modal';

const SubscriptionPlans = () => {
  const { addToast } = useToast();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // Upgrade Modal states
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Mock Card (1111-2222-3333-4444)');
  const [upgrading, setUpgrading] = useState(false);

  const fetchSubscriptionDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get('/subscription');
      setSubscription(res.data.subscription);
    } catch (error) {
      console.error('Error fetching subscription details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const handleOpenCheckout = (planName) => {
    if (subscription?.plan === planName) {
      addToast(`You are already subscribed to the ${planName}`, 'info');
      return;
    }
    setSelectedPlan(planName);
    setCheckoutModalOpen(true);
  };

  const handleProcessUpgrade = async (e) => {
    e.preventDefault();
    setUpgrading(true);

    try {
      const res = await API.post('/subscription/upgrade', {
        plan: selectedPlan,
        paymentMethod
      });
      setSubscription(res.data.subscription);
      setCheckoutModalOpen(false);
      addToast(res.data.message || `Successfully upgraded to ${selectedPlan}!`, 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Upgrade failed. Please try again.', 'error');
    } finally {
      setUpgrading(false);
    }
  };

  const pricingPlans = [
    {
      name: 'Free Plan',
      price: '$0',
      period: 'lifetime',
      desc: 'Perfect for starters seeking quick crystal advice.',
      features: [
        '1 Gemstone Recommendation / Month',
        'Basic Zodiac Profiles',
        'Zodiac daily horoscopes view'
      ]
    },
    {
      name: 'Premium Plan',
      price: '$29',
      period: 'year',
      desc: 'Ideal for astrology enthusiasts aligning cosmic energy.',
      features: [
        'Unlimited Recommendation Reports',
        'Up to 3 Alternative Gemstones',
        'Weekly & Monthly Horoscope logs',
        'Saved Reports Archives',
        'Simulated PDF Downloads'
      ],
      popular: true
    },
    {
      name: 'Astrology Pro Plan',
      price: '$99',
      period: 'year',
      desc: 'Designed for professional consultation reports.',
      features: [
        'All Premium Tier features included',
        'Transit charts mapping metrics',
        'Astrological house details',
        'Priority support helpdesk'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Subscription Plans</h2>
        <p className="text-slate-400 text-xs mt-1">Upgrade your account to unlock detailed astrology transits and custom reports</p>
      </div>

      {/* Active Subscription Banner */}
      {loading ? (
        <Skeleton className="h-24 w-full rounded-2xl" />
      ) : subscription ? (
        <div className="glass p-5 rounded-2xl border border-indigo-500/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Current Plan Status</span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
              <CheckCircle2 className="text-indigo-400 w-5 h-5" />
              {subscription.plan} &bull; <span className="text-xs text-emerald-400 uppercase font-semibold">{subscription.status}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Valid until {new Date(subscription.expiryDate).toLocaleDateString()}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 bg-slate-800/40 border border-slate-700/20 px-3 py-1.5 rounded-lg">
            Active Tier ID: <span className="font-mono text-indigo-300">{subscription._id.substring(0, 10)}...</span>
          </div>
        </div>
      ) : null}

      {/* Pricing Grids cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`glass rounded-3xl p-6 border flex flex-col justify-between relative ${
              plan.popular
                ? 'border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-gradient-to-b from-cosmic-800/10 to-transparent'
                : 'border-slate-800/40'
            }`}
          >
            {plan.popular && (
              <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-wider">
                Most Popular Choice
              </span>
            )}

            <div>
              <div className="mb-4">
                <h4 className="text-lg font-extrabold text-white">{plan.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-xs text-slate-500">/ {plan.period}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-450 mb-8 border-t border-slate-800/30 pt-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-slate-350">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleOpenCheckout(plan.name)}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                subscription?.plan === plan.name
                  ? 'bg-slate-800/50 text-slate-400 border border-slate-700/30 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  : 'border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white'
              }`}
            >
              {subscription?.plan === plan.name ? 'Active Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Billing history table logs */}
      {subscription && subscription.billingHistory && subscription.billingHistory.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800/20">
          <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            Simulated Billing History
          </h3>

          <div className="glass rounded-2xl border border-slate-800/40 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse text-slate-300">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800/40 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Upgrade Tier</th>
                  <th className="p-4">Price Paid</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Date Charged</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/20">
                {subscription.billingHistory.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-800/10 transition-colors">
                    <td className="p-4 font-semibold text-slate-200">{log.plan}</td>
                    <td className="p-4 font-mono">${log.amount}.00</td>
                    <td className="p-4">{log.paymentMethod}</td>
                    <td className="p-4 text-slate-500">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold uppercase">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Simulated Checkout Modal */}
      <Modal isOpen={checkoutModalOpen} onClose={() => setCheckoutModalOpen(false)} title="Simulated Payment Checkout">
        <form onSubmit={handleProcessUpgrade} className="space-y-5">
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 text-xs text-slate-300 space-y-2">
            <p><strong>Upgrading to:</strong> {selectedPlan}</p>
            <p><strong>Simulated Cost:</strong> {selectedPlan === 'Premium Plan' ? '$29.00' : '$99.00'} / year</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-xs text-slate-200 outline-none"
            >
              <option value="Mock Visa Card (4111-xxxx-xxxx-1111)">Mock Visa Card (4111-xxxx-xxxx-1111)</option>
              <option value="Mock MasterCard (5123-xxxx-xxxx-2222)">Mock MasterCard (5123-xxxx-xxxx-2222)</option>
              <option value="Mock PayPal Wallet Account">Mock PayPal Wallet Account</option>
            </select>
          </div>

          <div className="text-[10px] text-slate-500 flex items-start gap-1">
            <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
            No actual credit cards will be charged. This simulates upgrading roles in Mongoose databases.
          </div>

          <button
            type="submit"
            disabled={upgrading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wide transition-all duration-200"
          >
            {upgrading ? 'Processing payment...' : 'Simulate Success Payment'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default SubscriptionPlans;
