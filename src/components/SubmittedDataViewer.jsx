import React, { useState } from 'react';

const SubmittedDataViewer = ({ submittedData, clearData }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  if (submittedData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No submissions yet</h3>
        <p className="text-gray-500">Submit a form to see the data here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Submitted Data</h2>
        <button
          onClick={clearData}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border-r pr-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Submissions</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {submittedData.map((data, index) => {
              const date = new Date(data.submittedAt);
              const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
              
              return (
                <div
                  key={index}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedSubmission === index
                      ? 'bg-indigo-100 border-l-4 border-indigo-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSubmission(index)}
                >
                  <div className="font-medium">Submission #{index + 1}</div>
                  <div className="text-xs text-gray-500">{formattedDate}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="md:col-span-2 pl-4">
          {selectedSubmission !== null ? (
            <>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Submission Details</h3>
              <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(submittedData[selectedSubmission], null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p>Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedDataViewer;
