import React from 'react';
import { CloudSun, Wind, Droplets, ShieldCheck, AlertCircle } from 'lucide-react';

export const WeatherWidget = ({ weatherInfo, destination }) => {
  if (!weatherInfo) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-navy-950 font-sans flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-turquoise-600" />
          Climate & Weather Outlook
        </h3>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
            weatherInfo.isLive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {weatherInfo.isLive ? (
            <>
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Live Data
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3 text-slate-400" /> Estimated Climate
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-extrabold text-navy-950 font-sans">
            {weatherInfo.temperature || '22°C'}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 block">
              {weatherInfo.condition || 'Clear & Sunny'}
            </span>
            <span className="text-[10px] text-slate-400 block">{destination}</span>
          </div>
        </div>

        {weatherInfo.windSpeed && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Wind className="w-4 h-4 text-turquoise-600" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Wind</span>
              <span className="font-semibold text-slate-700">{weatherInfo.windSpeed}</span>
            </div>
          </div>
        )}

        {weatherInfo.humidity && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Humidity</span>
              <span className="font-semibold text-slate-700">{weatherInfo.humidity}</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3 leading-relaxed">
        {weatherInfo.forecast || 'Mild and comfortable seasonal weather expected for outdoor sightseeing.'}
      </p>
      <span className="text-[9px] text-slate-400 block mt-1">Source: {weatherInfo.source}</span>
    </div>
  );
};

export default WeatherWidget;
