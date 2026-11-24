import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-soft animate-pulse">
    <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
    <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-100 rounded-md w-1/2 mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
      <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
    </div>
    <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
  </div>
);

export const ItinerarySkeleton = () => (
  <div className="space-y-6 max-w-4xl mx-auto py-8 animate-pulse">
    <div className="h-10 bg-slate-200 rounded-xl w-2/3"></div>
    <div className="h-5 bg-slate-100 rounded-md w-1/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="h-28 bg-slate-200 rounded-2xl"></div>
      <div className="h-28 bg-slate-200 rounded-2xl"></div>
      <div className="h-28 bg-slate-200 rounded-2xl"></div>
    </div>
    <div className="space-y-4">
      <div className="h-40 bg-slate-200 rounded-2xl"></div>
      <div className="h-40 bg-slate-200 rounded-2xl"></div>
      <div className="h-40 bg-slate-200 rounded-2xl"></div>
    </div>
  </div>
);
