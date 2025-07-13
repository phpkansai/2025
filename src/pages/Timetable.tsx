import React, { useState, useMemo } from 'react';
import { Clock, MapPin, User, Tag, Calendar } from 'lucide-react';
import timetableData from '../timetable.json';

interface Track {
  name: string;
  sort: number;
}

interface Tag {
  name: string;
  color_text: string;
  color_background: string;
}

interface Speaker {
  name: string;
  kana: string;
  twitter?: string;
  avatar_url: string;
}

interface TimetableItem {
  type: 'talk' | 'timeslot';
  uuid: string;
  url?: string;
  title: string;
  abstract?: string | null;
  accepted?: boolean;
  track: Track;
  starts_at: string;
  length_min: number;
  tags?: Tag[];
  speaker?: Speaker;
  fav?: boolean;
  fav_count?: number;
  feedback?: {
    open: boolean;
    url: string;
  };
}

const Timetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2'>('day1');

  // Extract unique tracks for the selected day
  const tracks = useMemo(() => {
    const dayItems = timetableData.timetable.filter((item: TimetableItem) => {
      const itemDate = new Date(item.starts_at);
      const isDay1 = itemDate.getDate() === 18;
      return (selectedDay === 'day1' && isDay1) || (selectedDay === 'day2' && !isDay1);
    });
    
    const uniqueTracks = new Map<string, Track>();
    dayItems.forEach((item: TimetableItem) => {
      if (!uniqueTracks.has(item.track.name)) {
        uniqueTracks.set(item.track.name, item.track);
      }
    });
    return Array.from(uniqueTracks.values()).sort((a, b) => a.sort - b.sort);
  }, [selectedDay]);

  // Filter timetable items by day
  const filteredItems = useMemo(() => {
    return timetableData.timetable.filter((item: TimetableItem) => {
      const itemDate = new Date(item.starts_at);
      const isDay1 = itemDate.getDate() === 18;
      return (selectedDay === 'day1' && isDay1) || (selectedDay === 'day2' && !isDay1);
    });
  }, [selectedDay]);

  // Group items by time slot and track
  const groupedByTime = useMemo(() => {
    const timeSlots = new Map<string, Map<string, TimetableItem>>();
    
    filteredItems.forEach((item) => {
      const timeKey = item.starts_at;
      if (!timeSlots.has(timeKey)) {
        timeSlots.set(timeKey, new Map());
      }
      timeSlots.get(timeKey)!.set(item.track.name, item);
    });
    
    return Array.from(timeSlots.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredItems]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  const formatEndTime = (dateString: string, lengthMin: number) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + lengthMin);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">タイムテーブル</h1>

      {/* Day Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={() => setSelectedDay('day1')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedDay === 'day1'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-2" />
            7月18日 (金)
          </button>
          <button
            onClick={() => setSelectedDay('day2')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedDay === 'day2'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-2" />
            7月19日 (土)
          </button>
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-4 text-left sticky left-0 z-10 min-w-[120px]">
                時間
              </th>
              {tracks.map((track) => (
                <th key={track.name} className="border border-gray-300 bg-gray-100 p-4 text-center min-w-[300px]">
                  {track.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupedByTime.map(([timeKey, trackItems]) => {
              const firstItem = Array.from(trackItems.values())[0];
              return (
                <tr key={timeKey}>
                  <td className="border border-gray-300 bg-gray-50 p-4 font-medium sticky left-0 z-10">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <div>
                        <div>{formatTime(timeKey)}</div>
                        <div className="text-sm text-gray-500">
                          - {formatEndTime(timeKey, firstItem.length_min)}
                        </div>
                      </div>
                    </div>
                  </td>
                  {tracks.map((track) => {
                    const item = trackItems.get(track.name);
                    if (!item) {
                      return <td key={track.name} className="border border-gray-300 bg-gray-50"></td>;
                    }
                    return (
                      <td key={track.name} className="border border-gray-300 p-4 align-top">
                        <div className={`rounded-lg p-4 h-full ${
                          item.type === 'timeslot' ? 'bg-gray-100' : 'bg-white'
                        }`}>
                          <h3 className="text-lg font-semibold mb-2">
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {item.title}
                              </a>
                            ) : (
                              item.title
                            )}
                          </h3>
                          
                          {item.speaker && (
                            <div className="flex items-center mb-2">
                              <img
                                src={item.speaker.avatar_url}
                                alt={item.speaker.name}
                                className="w-10 h-10 rounded-full mr-2"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.speaker.name}</p>
                                {item.speaker.twitter && (
                                  <a
                                    href={`https://x.com/${item.speaker.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    @{item.speaker.twitter}
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    backgroundColor: tag.color_background,
                                    color: tag.color_text,
                                  }}
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.length_min}分
                            </span>
                          </div>

                          {item.abstract && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-blue-600 hover:underline text-xs">
                                概要を見る
                              </summary>
                              <div className="mt-2 text-xs text-gray-700 whitespace-pre-line">
                                {item.abstract}
                              </div>
                            </details>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;