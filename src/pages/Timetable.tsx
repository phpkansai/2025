import React, { useState, useMemo, useEffect } from 'react';
import { Clock, Tag, Calendar } from 'lucide-react';
import timetableData from '../timetable.json';
import ErrorBoundary from '../components/ErrorBoundary';

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
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => {
      setIsPrintMode(true);
      // Hide header and footer
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
    };

    const handleAfterPrint = () => {
      setIsPrintMode(false);
      // Show header and footer
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  // Helper function to get the base room name (without room number)
  const getBaseRoomName = (trackName: string) => {
    // Extract the base room name (e.g., "ルームA" from "ルームA = 307")
    return trackName.split('=')[0].trim();
  };

  // Extract unique tracks for the selected day (excluding 交流スペース and スポンサーブース)
  const tracks = useMemo(() => {
    const dayItems = timetableData.timetable.filter((item: TimetableItem) => {
      const itemDate = new Date(item.starts_at);
      const isDay1 = itemDate.getDate() === 18;
      return (selectedDay === 'day1' && isDay1) || (selectedDay === 'day2' && !isDay1);
    });

    const uniqueTracks = new Map<string, Track>();
    dayItems.forEach((item: TimetableItem) => {
      if (!item.track) {
        console.error('Missing track for item:', item);
        return;
      }
      const baseRoomName = getBaseRoomName(item.track.name);
      // Exclude 交流スペース and スポンサーブース
      if (baseRoomName !== '交流スペース' && baseRoomName !== 'スポンサーブース') {
        if (!uniqueTracks.has(baseRoomName)) {
          uniqueTracks.set(baseRoomName, item.track);
        }
      }
    });
    const result = Array.from(uniqueTracks.values()).sort((a, b) => a.sort - b.sort);
    console.log('Selected day:', selectedDay, 'Tracks:', result);
    return result;
  }, [selectedDay]);

  // Filter timetable items by day (excluding 交流スペース and スポンサーブース)
  const filteredItems = useMemo(() => {
    return timetableData.timetable.filter((item: TimetableItem) => {
      if (!item.track) {
        console.error('Missing track for item in filteredItems:', item);
        return false;
      }
      const itemDate = new Date(item.starts_at);
      const isDay1 = itemDate.getDate() === 18;
      const matchesDay = (selectedDay === 'day1' && isDay1) || (selectedDay === 'day2' && !isDay1);
      // Exclude 交流スペース and スポンサーブース
      const baseRoomName = getBaseRoomName(item.track.name);
      return matchesDay && baseRoomName !== '交流スペース' && baseRoomName !== 'スポンサーブース';
    });
  }, [selectedDay]);

  // Group items by time slot and track
  const groupedByTime = useMemo(() => {
    const timeSlots = new Map<string, Map<string, TimetableItem>>();
    const longSessionsMap = new Map<string, { item: TimetableItem; rowSpan: number; startTime: string }>();
    const ltGroupedItems = new Map<string, TimetableItem[]>();

    // Group LT sessions (5-minute sessions from 16:10 onwards on day 2)
    const ltItems: TimetableItem[] = [];
    const sponsorSession = filteredItems.find(item => 
      item.title === 'スポンサーセッション' && 
      item.starts_at === '2025-07-19T15:45:00+09:00'
    );

    filteredItems.forEach((item) => {
      if (!item.track) {
        console.error('Missing track in groupedByTime:', item);
        return;
      }
      const itemDate = new Date(item.starts_at);
      const isDay2 = itemDate.getDate() === 19;
      const isLTTime = isDay2 && itemDate.getHours() >= 16 && item.length_min === 5;

      if (isLTTime) {
        ltItems.push(item);
        return; // Skip adding to timeSlots
      }

      const timeKey = item.starts_at;
      if (!timeSlots.has(timeKey)) {
        timeSlots.set(timeKey, new Map());
      }
      const baseRoomName = getBaseRoomName(item.track.name);
      timeSlots.get(timeKey)!.set(baseRoomName, item);

      // Check for long sessions (more than 60 minutes)
      if (item.length_min > 60) {
        const startTime = new Date(item.starts_at);
        const endTime = new Date(startTime.getTime() + item.length_min * 60000);

        // Count how many time slots this session spans
        let rowSpan = 1;
        const allTimeSlots = Array.from(new Set(filteredItems.map(i => i.starts_at))).sort();
        const currentIndex = allTimeSlots.findIndex(t => t === timeKey);

        for (let i = currentIndex + 1; i < allTimeSlots.length; i++) {
          const nextSlotTime = new Date(allTimeSlots[i]);
          if (nextSlotTime < endTime) {
            rowSpan++;
          } else {
            break;
          }
        }

        longSessionsMap.set(`${baseRoomName}-${timeKey}`, {
          item,
          rowSpan,
          startTime: timeKey
        });
      }
    });

    // Add sponsor session and LT session separately
    if (sponsorSession) {
      if (!sponsorSession.track) {
        console.error('Sponsor session missing track:', sponsorSession);
      } else {
        const timeKey = sponsorSession.starts_at;
        if (!timeSlots.has(timeKey)) {
          timeSlots.set(timeKey, new Map());
        }
        const baseRoomName = getBaseRoomName(sponsorSession.track.name);
        timeSlots.get(timeKey)!.set(baseRoomName, sponsorSession);
      }
    }

    // Add LT session as a single grouped item
    if (ltItems.length > 0 && sponsorSession && sponsorSession.track) {
      const ltStartTime = '2025-07-19T16:10:00+09:00'; // First LT time
      const ltSession: TimetableItem = {
        type: 'timeslot',
        uuid: 'lt-session',
        title: 'LT',
        track: sponsorSession.track,
        starts_at: ltStartTime,
        length_min: 50, // 16:10-17:00 (50 minutes)
        tags: []
      };

      if (!timeSlots.has(ltStartTime)) {
        timeSlots.set(ltStartTime, new Map());
      }
      const baseRoomName = getBaseRoomName(sponsorSession.track.name);
      timeSlots.get(ltStartTime)!.set(baseRoomName, ltSession);

      // Store LT items
      ltGroupedItems.set('lt-session', ltItems.sort((a, b) => {
        if (!a.starts_at || !b.starts_at) {
          console.error('LT item missing starts_at:', { a, b });
          return 0;
        }
        return a.starts_at.localeCompare(b.starts_at);
      }));
    }

    return {
      timeSlots: Array.from(timeSlots.entries()).sort(([a], [b]) => {
        if (!a || !b) {
          console.error('Invalid time slot keys:', { a, b });
          return 0;
        }
        return a.localeCompare(b);
      }),
      longSessions: longSessionsMap,
      ltGroupedItems
    };
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
    <div className="w-full max-w-full mx-auto px-2 py-4 pt-28 print:p-0 print:pt-0">
      <h1 className="text-2xl font-bold mb-4 text-center print:text-xl print:mb-2">
        タイムテーブル {selectedDay === 'day1' ? '7月18日 (金)' : '7月19日 (土)'}
      </h1>

      {/* Day Selector */}
      <div className="flex justify-center mb-4 print:hidden">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={() => setSelectedDay('day1')}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedDay === 'day1'
                ? 'bg-[#46AA65] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="inline-block w-3 h-3 mr-1" />
            7月18日 (金)
          </button>
          <button
            onClick={() => setSelectedDay('day2')}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedDay === 'day2'
                ? 'bg-[#46AA65] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="inline-block w-3 h-3 mr-1" />
            7月19日 (土)
          </button>
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full border-collapse text-xs print:text-[10px] table-fixed">
          <colgroup>
            <col className="w-16 print:w-12" />
            {tracks.filter(track => track && track.name).map((track) => (
              <col key={track.name} style={{ width: `${Math.floor((100 - 10) / tracks.filter(t => t && t.name).length)}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-2 text-left sticky left-0 z-10 print:static print:p-1">
                時間
              </th>
              {tracks.filter(track => track && track.name).map((track) => (
                <th key={getBaseRoomName(track.name)} className="border border-gray-300 bg-gray-100 p-2 text-center print:p-1">
                  {track.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupedByTime.timeSlots.map(([timeKey, trackItems]) => {
              const firstItem = Array.from(trackItems.values())[0];
              return (
                <tr key={timeKey}>
                  <td className="border border-gray-300 bg-gray-50 p-2 font-medium sticky left-0 z-10 print:static print:p-1">
                    <div className="flex items-center print:block">
                      <Clock className="w-3 h-3 mr-1 print:hidden" />
                      <div>
                        <div className="text-xs">{formatTime(timeKey)}</div>
                        <div className="text-[10px] text-gray-500">
                          {formatEndTime(timeKey, firstItem.length_min)}
                        </div>
                      </div>
                    </div>
                  </td>
                  {tracks.filter(track => track && track.name).map((track) => {
                    const baseRoomName = getBaseRoomName(track.name);
                    const item = trackItems.get(baseRoomName);
                    const longSessionKey = `${baseRoomName}-${timeKey}`;
                    const longSession = groupedByTime.longSessions.get(longSessionKey);

                    // Check if this cell should be skipped (part of a rowspan from earlier)
                    const shouldSkip = Array.from(groupedByTime.longSessions.values()).some(ls => {
                      if (!ls.item.track || !ls.item.track.name) {
                        console.error('Invalid track in longSession item:', ls.item);
                        return false;
                      }
                      const lsBaseRoomName = getBaseRoomName(ls.item.track.name);
                      if (lsBaseRoomName === baseRoomName && ls.startTime !== timeKey) {
                        const startTime = new Date(ls.startTime);
                        const endTime = new Date(startTime.getTime() + ls.item.length_min * 60000);
                        const currentTime = new Date(timeKey);
                        return currentTime >= startTime && currentTime < endTime;
                      }
                      return false;
                    });

                    if (shouldSkip) {
                      return null; // Skip this cell as it's covered by rowspan
                    }

                    if (!item) {
                      return <td key={baseRoomName} className="border border-gray-300 bg-gray-50"></td>;
                    }

                    const rowSpan = longSession ? longSession.rowSpan : 1;

                    return (
                      <td 
                        key={baseRoomName} 
                        className="border border-gray-300 p-2 align-top print:p-1"
                        rowSpan={rowSpan}
                      >
                        <div className={`rounded p-2 h-full print:p-1 ${
                          item.type === 'timeslot' ? 'bg-gray-100' : 'bg-white'
                        }`}>
                          <h3 className="text-sm font-semibold mb-1 print:text-[11px] print:leading-tight">
                            {item.url && !isPrintMode ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#46AA65] hover:underline print:text-black"
                              >
                                {item.title}
                              </a>
                            ) : (
                              item.title
                            )}
                          </h3>

                          {item.speaker && (
                            <div className="flex items-center mb-1 print:mb-0">
                              <img
                                src={item.speaker.avatar_url}
                                alt={item.speaker.name}
                                className="w-6 h-6 rounded-full mr-1 print:hidden"
                              />
                              <div>
                                <p className="font-medium text-xs print:text-[10px]">{item.speaker.name}</p>
                                {item.speaker.twitter && !isPrintMode && (
                                  <a
                                    href={`https://x.com/${item.speaker.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-[#46AA65] hover:underline print:hidden"
                                  >
                                    @{item.speaker.twitter}
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1 print:mb-0">
                              {item.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium print:text-[9px] print:border print:border-gray-400"
                                  style={{
                                    backgroundColor: isPrintMode ? 'transparent' : tag.color_background,
                                    color: isPrintMode ? '#000' : tag.color_text,
                                  }}
                                >
                                  <Tag className="w-2 h-2 mr-0.5 print:hidden" />
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-[10px] text-gray-600 print:text-[9px]">
                            <span className="flex items-center">
                              <Clock className="w-2 h-2 mr-0.5 print:hidden" />
                              {item.length_min}分
                              {longSession && ` (${formatTime(timeKey)} - ${formatEndTime(timeKey, item.length_min)})`}
                            </span>
                          </div>

                          {item.uuid === 'lt-session' && !isPrintMode && (
                            <details className="mt-1 print:hidden">
                              <summary className="cursor-pointer text-[#46AA65] hover:underline text-[10px]">
                                詳細を見る
                              </summary>
                              <div className="mt-1 text-[10px] text-gray-700 space-y-1">
                                {groupedByTime.ltGroupedItems.get('lt-session')?.map((ltItem) => (
                                  <div key={ltItem.uuid} className="border-l-2 border-gray-300 pl-2">
                                    <div className="font-medium">
                                      {formatTime(ltItem.starts_at)} ({ltItem.length_min}分)
                                    </div>
                                    <div className="text-gray-800">
                                      {ltItem.url ? (
                                        <a
                                          href={ltItem.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[#46AA65] hover:underline"
                                        >
                                          {ltItem.title}
                                        </a>
                                      ) : (
                                        ltItem.title
                                      )}
                                    </div>
                                    {ltItem.speaker && (
                                      <div className="text-gray-600">
                                        {ltItem.speaker.name}
                                        {ltItem.speaker.twitter && (
                                          <span className="ml-1">
                                            (@{ltItem.speaker.twitter})
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}

                          {item.abstract && !isPrintMode && item.uuid !== 'lt-session' && (
                            <details className="mt-1 print:hidden">
                              <summary className="cursor-pointer text-[#46AA65] hover:underline text-[10px]">
                                概要を見る
                              </summary>
                              <div className="mt-1 text-[10px] text-gray-700 whitespace-pre-line">
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

const TimetableWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <Timetable />
  </ErrorBoundary>
);

export default TimetableWithErrorBoundary;
