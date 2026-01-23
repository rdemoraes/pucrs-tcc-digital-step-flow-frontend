import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface OnboardingData {
  businessStage: string
  industryType: string
  technicalKnowledge: string
  businessPlanning: string
  mainObjectives: string[]
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    businessStage: '',
    industryType: '',
    technicalKnowledge: '',
    businessPlanning: '',
    mainObjectives: [],
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      navigate('/subscription')
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome! Let's get started</h2>
              <span className="text-sm text-gray-500">Step {step + 1} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${((step + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {step === 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Stage
                    </label>
                    <select
                      value={data.businessStage}
                      onChange={(e) => setData({ ...data, businessStage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select...</option>
                      <option value="idea">Just an idea</option>
                      <option value="early">Early stage</option>
                      <option value="established">Established business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry Type
                    </label>
                    <select
                      value={data.industryType}
                      onChange={(e) => setData({ ...data, industryType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select...</option>
                      <option value="tech">Technology</option>
                      <option value="retail">Retail</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Maturity</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Knowledge
                    </label>
                    <select
                      value={data.technicalKnowledge}
                      onChange={(e) => setData({ ...data, technicalKnowledge: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select...</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Planning
                    </label>
                    <select
                      value={data.businessPlanning}
                      onChange={(e) => setData({ ...data, businessPlanning: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select...</option>
                      <option value="none">No plan yet</option>
                      <option value="draft">Draft plan</option>
                      <option value="complete">Complete plan</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Goals</h3>
                <div className="space-y-2">
                  {['Launch product', 'Scale business', 'Improve efficiency', 'Digital transformation'].map((goal) => (
                    <label key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.mainObjectives.includes(goal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setData({ ...data, mainObjectives: [...data.mainObjectives, goal] })
                          } else {
                            setData({ ...data, mainObjectives: data.mainObjectives.filter((o) => o !== goal) })
                          }
                        }}
                        className="mr-2"
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Complete!</h3>
                <p className="text-gray-600">
                  Thank you for completing the onboarding. You're all set to choose a subscription plan.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {step === 3 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

