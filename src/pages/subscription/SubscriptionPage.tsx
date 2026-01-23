import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    features: ['All Basic features', 'Feature 4', 'Feature 5', 'Priority support'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    features: ['All Pro features', 'Feature 6', 'Feature 7', 'Dedicated support', 'Custom integrations'],
  },
]

export function SubscriptionPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!selectedPlan) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Select the plan that best fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-indigo-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-500 text-white text-center py-1 rounded-t-lg -mt-8 -mx-8 mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 px-4 rounded-md font-medium ${
                  selectedPlan === plan.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe and Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

