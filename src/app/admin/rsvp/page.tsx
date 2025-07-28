'use client';

import { useEffect, useState } from 'react';

interface RSVPSubmission {
  id: string;
  name: string;
  attendance: string;
  phone: string;
  message: string;
  timestamp: string;
}

export default function AdminRSVPPage() {
  const [submissions, setSubmissions] = useState<RSVPSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/rsvp');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceColor = (attendance: string) => {
    switch (attendance) {
      case 'yes': return 'text-green-600';
      case 'no': return 'text-red-600';
      case 'maybe': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-honeymoon text-primary mb-8">RSVP Submissions</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-honeymoon text-primary mb-8">RSVP Submissions</h1>
      
      <div className="mb-4">
        <p className="text-lg text-secondary">
          Total Submissions: <span className="font-semibold">{submissions.length}</span>
        </p>
        <p className="text-sm text-tertiary">
          Attending: {submissions.filter(s => s.attendance === 'yes').length} | 
          Not Attending: {submissions.filter(s => s.attendance === 'no').length} | 
          Maybe: {submissions.filter(s => s.attendance === 'maybe').length}
        </p>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <p className="text-center text-tertiary py-8">No submissions yet</p>
        ) : (
          submissions.map((submission) => (
            <div key={submission.id} className="border border-tertiary rounded-lg p-6 bg-background">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{submission.name}</h3>
                  <p className="text-sm text-tertiary">
                    {new Date(submission.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(submission.attendance)}`}>
                  {submission.attendance === 'yes' ? 'Attending' : 
                   submission.attendance === 'no' ? 'Not Attending' : 'Maybe'}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-secondary">
                  <span className="font-medium">Phone:</span> {submission.phone}
                </p>
                {submission.message && (
                  <div>
                    <p className="font-medium text-secondary mb-1">Message:</p>
                    <p className="text-foreground bg-tertiary/20 p-3 rounded">{submission.message}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 