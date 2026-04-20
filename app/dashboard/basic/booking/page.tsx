// app/dashboard/basic/booking/page.tsx
'use client';

import React, { useRef, useState } from 'react';
import { ArrowRight, Check, Laptop, X, UploadCloud } from 'lucide-react';

type DeviceType = 'pc' | 'laptop';
type YesNo = 'yes' | 'no';
type PlanStep = 1 | 2 | 3;

export default function BasicBookingPage(): JSX.Element {
  const [step, setStep] = useState<PlanStep>(1);

  // Step 1
  const [deviceType, setDeviceType] = useState<DeviceType>('pc');
  const [displayShows, setDisplayShows] = useState<YesNo>('yes');
  const [requireOSUpdate, setRequireOSUpdate] = useState<YesNo>('no');
  const [operatingSystem, setOperatingSystem] = useState<string>('Windows 10');
  const [displayBroken, setDisplayBroken] = useState<YesNo>('no');

  // Step 2
  const [requestDriversUpdate, setRequestDriversUpdate] = useState<YesNo>('no');
  const [additionalSoftwareNeeded, setAdditionalSoftwareNeeded] = useState<YesNo>('no');
  const [additionalSoftware, setAdditionalSoftware] = useState<string[]>([]);

  // Step 3
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  // UI / submission
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Flip animation state
  const [animClass, setAnimClass] = useState<string>('');
  const animTimeoutRef = useRef<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleSoftware = (name: string) =>
    setAdditionalSoftware((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setScreenshotFile(file);
    if (!file) {
      setScreenshotPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const validateStep = (s: PlanStep) => {
    if (s === 1) {
      if (displayShows === 'yes' && requireOSUpdate === 'yes' && !operatingSystem) {
        return 'Please select the operating system.';
      }
      if (displayShows === 'no' && !displayBroken) {
        return 'Please indicate whether the display is broken.';
      }
    }
    return null;
  };

  // Flip helpers
  const flipToStep = (target: PlanStep, direction: 'forward' | 'back') => {
    if (animTimeoutRef.current) {
      window.clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    setAnimClass(direction === 'forward' ? 'flip-forward-out' : 'flip-back-out');
    animTimeoutRef.current = window.setTimeout(() => {
      setStep(target);
      setAnimClass(direction === 'forward' ? 'flip-forward-in' : 'flip-back-in');
      animTimeoutRef.current = window.setTimeout(() => {
        setAnimClass('');
        animTimeoutRef.current = null;
      }, 320);
    }, 320);
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setErrorMessage(err);
      return;
    }
    setErrorMessage(null);
    if (step < 3) flipToStep((step + 1) as PlanStep, 'forward');
  };

  const goPrev = () => {
    setErrorMessage(null);
    if (step > 1) flipToStep((step - 1) as PlanStep, 'back');
    else window.history.back();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const err = validateStep(step);
    if (err) {
      setErrorMessage(err);
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('deviceType', deviceType);
      formData.append('displayShows', displayShows);
      formData.append('requireOSUpdate', requireOSUpdate);
      formData.append('operatingSystem', operatingSystem);
      formData.append('displayBroken', displayBroken);
      formData.append('requestDriversUpdate', requestDriversUpdate);
      formData.append('additionalSoftwareNeeded', additionalSoftwareNeeded);
      formData.append('additionalSoftware', JSON.stringify(additionalSoftware));
      formData.append('problemDescription', problemDescription);
      if (screenshotFile) formData.append('screenshot', screenshotFile, screenshotFile.name);

      const res = await fetch('/dashboard/basic/booking', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Server error');
      }

      setSuccessMessage('Quote request submitted. We will contact you to confirm details.');
      setSubmitting(false);

      // reset form
      setStep(1);
      setDeviceType('pc');
      setDisplayShows('yes');
      setRequireOSUpdate('no');
      setOperatingSystem('Windows 10');
      setDisplayBroken('no');
      setRequestDriversUpdate('no');
      setAdditionalSoftwareNeeded('no');
      setAdditionalSoftware([]);
      setProblemDescription('');
      setScreenshotFile(null);
      setScreenshotPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setSubmitting(false);
      setErrorMessage(err?.message ?? 'Failed to submit request.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 text-gray-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-semibold">
            NM
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">Book Service — Basic Care</h1>
            <p className="text-sm text-gray-600">Fill the steps below to request a quote.</p>
          </div>
          <div className="ml-auto text-sm text-gray-600">Step {step} of 3</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Stepper */}
          <div className="px-6 py-5 border-b">
            <div className="flex items-center gap-4">
              <StepPill index={1} active={step === 1} done={step > 1} label="Device" />
              <div className="flex-1 border-t border-dashed border-gray-200" />
              <StepPill index={2} active={step === 2} done={step > 2} label="Software" />
              <div className="flex-1 border-t border-dashed border-gray-200" />
              <StepPill index={3} active={step === 3} done={false} label="Details" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {errorMessage && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 p-3 rounded">
                <X className="w-4 h-4" />
                <div className="text-sm">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 text-green-700 p-3 rounded">
                <Check className="w-4 h-4" />
                <div className="text-sm">{successMessage}</div>
              </div>
            )}

            {/* Animated content wrapper */}
            <div className="relative perspective">
              <div className={`flip-panel ${animClass}`}>
                {/* Step 1 */}
                {step === 1 && (
                  <section className="space-y-6">
                    <h2 className="text-lg font-semibold text-black">Device Information</h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <label className="block text-sm font-medium text-black mb-2">Device Type</label>
                        <div className="flex gap-3">
                          <RadioCard checked={deviceType === 'pc'} onChange={() => setDeviceType('pc')} label="PC" icon={<Laptop className="w-5 h-5 text-blue-600" />} />
                          <RadioCard checked={deviceType === 'laptop'} onChange={() => setDeviceType('laptop')} label="Laptop" icon={<Laptop className="w-5 h-5 text-blue-600" />} />
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <label className="block text-sm font-medium text-black mb-2">Does it display?</label>
                        <div className="flex gap-3">
                          <RadioCard checked={displayShows === 'yes'} onChange={() => setDisplayShows('yes')} label="Yes" />
                          <RadioCard checked={displayShows === 'no'} onChange={() => setDisplayShows('no')} label="No" />
                        </div>
                      </div>
                    </div>

                    {displayShows === 'yes' && (
                      <div className="p-4 bg-white rounded-lg border shadow-sm">
                        <label className="block text-sm text-black mb-2">Require Operating System update?</label>
                        <div className="flex gap-3 mb-3">
                          <RadioCard checked={requireOSUpdate === 'yes'} onChange={() => setRequireOSUpdate('yes')} label="Yes" />
                          <RadioCard checked={requireOSUpdate === 'no'} onChange={() => setRequireOSUpdate('no')} label="No" />
                        </div>

                        {requireOSUpdate === 'yes' && (
                          <div>
                            <label className="block text-sm text-black mb-2">Select Operating System</label>
                            <select
                              value={operatingSystem}
                              onChange={(e) => setOperatingSystem(e.target.value)}
                              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-100"
                            >
                              <option>Windows 10</option>
                              <option>Windows 11</option>
                              <option>Latest Linux</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {displayShows === 'no' && (
                      <div className="p-4 bg-white rounded-lg border shadow-sm">
                        <label className="block text-sm font-medium text-black mb-2">Is the display broken?</label>
                        <div className="flex gap-3">
                          <RadioCard checked={displayBroken === 'yes'} onChange={() => setDisplayBroken('yes')} label="Yes" />
                          <RadioCard checked={displayBroken === 'no'} onChange={() => setDisplayBroken('no')} label="No" />
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <section className="space-y-6">
                    <h2 className="text-lg font-semibold text-black">Software & Updates</h2>

                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                      <label className="block text-sm font-medium text-black mb-2">
                        Do you want drivers update (including VPN and Anti-Virus)?
                      </label>
                      <div className="flex gap-3">
                        <RadioCard checked={requestDriversUpdate === 'yes'} onChange={() => setRequestDriversUpdate('yes')} label="Yes" />
                        <RadioCard checked={requestDriversUpdate === 'no'} onChange={() => setRequestDriversUpdate('no')} label="No" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                      <label className="block text-sm font-medium text-black mb-2">Additional software to install?</label>
                      <div className="flex gap-3 mb-3">
                        <RadioCard checked={additionalSoftwareNeeded === 'yes'} onChange={() => setAdditionalSoftwareNeeded('yes')} label="Yes" />
                        <RadioCard checked={additionalSoftwareNeeded === 'no'} onChange={() => setAdditionalSoftwareNeeded('no')} label="No" />
                      </div>

                      {additionalSoftwareNeeded === 'yes' && (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <CheckboxCard checked={additionalSoftware.includes('Microsoft Copilot')} onChange={() => toggleSoftware('Microsoft Copilot')} label="Microsoft Copilot" />
                          <CheckboxCard checked={additionalSoftware.includes('Office 365')} onChange={() => toggleSoftware('Office 365')} label="Office 365" />
                          <CheckboxCard checked={additionalSoftware.includes('Antivirus')} onChange={() => toggleSoftware('Antivirus')} label="Antivirus" />
                          <CheckboxCard checked={additionalSoftware.includes('VPN')} onChange={() => toggleSoftware('VPN')} label="VPN" />
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <section className="space-y-6">
                    <h2 className="text-lg font-semibold text-black">Additional Information</h2>

                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                      <label className="block text-sm font-medium text-black mb-2">Explain your problem</label>
                      <textarea
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        rows={6}
                        placeholder="Describe the issue in as much detail as you can (optional)."
                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                      <label className="block text-sm font-medium text-black mb-2">Optional screenshot</label>
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="screenshot"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 cursor-pointer border hover:bg-blue-100"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span className="text-sm">Upload screenshot</span>
                        </label>
                        <input id="screenshot" ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        {screenshotPreview ? (
                          <div className="flex items-center gap-3">
                            <img src={screenshotPreview} alt="preview" className="w-28 h-20 object-cover rounded-md border" />
                            <button
                              type="button"
                              onClick={() => {
                                setScreenshotFile(null);
                                setScreenshotPreview(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="text-sm text-red-600 underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-black"
                >
                  <span className="text-sm">{step > 1 ? 'Previous' : 'Cancel'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {step < 3 && (
                  <button type="button" onClick={goNext} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    <span className="text-sm">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {submitting ? 'Requesting...' : 'Request Quote'}
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t text-xs text-gray-400">
            By submitting you agree to be contacted to confirm the booking and arrange service.
          </div>
        </form>
      </div>

      {/* Inline styles for flip animation */}
      <style>{`
        .perspective { perspective: 1200px; }
        .flip-panel {
          transform-style: preserve-3d;
          transition: transform 320ms ease;
        }
        .flip-forward-out { transform: rotateY(-90deg); }
        .flip-forward-in { transform: rotateY(90deg); animation: flipIn 320ms forwards; }
        @keyframes flipIn { from { transform: rotateY(90deg); } to { transform: rotateY(0deg); } }
        .flip-back-out { transform: rotateY(90deg); }
        .flip-back-in { transform: rotateY(-90deg); animation: flipInBack 320ms forwards; }
        @keyframes flipInBack { from { transform: rotateY(-90deg); } to { transform: rotateY(0deg); } }
        .flip-panel, .flip-panel * { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </div>
  );
}

/* ---------- Small UI components ---------- */

function StepPill({ index, active, done, label }: { index: number; active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          done ? 'bg-green-100 text-green-700' : active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        {done ? <Check className="w-4 h-4" /> : index}
      </div>
      <div className={`text-sm ${active ? 'text-black font-medium' : 'text-gray-500'}`}>{label}</div>
    </div>
  );
}

function RadioCard({ checked, onChange, label, icon }: { checked: boolean; onChange: () => void; label: string; icon?: React.ReactNode }) {
  return (
    <label
      className={`flex items-center gap-3 px-3 py-2 rounded-md border cursor-pointer transition ${
        checked ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:bg-gray-50'
      }`}
    >
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white border text-blue-600">{icon ?? <div className="w-3 h-3 rounded-full bg-gray-200" />}</div>
      <div className="text-sm text-black">{label}</div>
    </label>
  );
}

function CheckboxCard({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-3 px-3 py-2 rounded-md border cursor-pointer transition bg-white border-gray-100 hover:bg-gray-50">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className={`w-5 h-5 rounded-sm flex items-center justify-center ${checked ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
        {checked ? <Check className="w-4 h-4" /> : null}
      </div>
      <div className="text-sm text-black">{label}</div>
    </label>
  );
}