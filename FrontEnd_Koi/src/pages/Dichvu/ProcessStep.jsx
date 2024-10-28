import React from 'react';
import { stepsData } from './DichvuData.jsx';

const StepProcess = ({ stepKey }) => {
    const steps = stepsData[stepKey] || [];
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white">
            <div className="space-y-4">
                {steps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg">
                        <div className="flex-shrink-0 w-20 flex flex-col items-center justify-center">
                            <div className="text-blue-600 font-bold">BƯỚC</div>
                            <div className="text-blue-600 text-2xl font-bold">{step.step}</div>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default StepProcess;