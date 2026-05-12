'use client';
import { useState } from 'react';
import { useData } from '@/lib/DataContext';
import {
  categoryLabels,
  categoryColors,
} from '@/lib/mockData';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export default function CalendarPage() {
  const { trainingPlans, getUserById } = useData();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Find events for each day
  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const date = new Date(dateStr);
    return trainingPlans.filter((tp) => {
      const start = new Date(tp.startDate);
      const end = new Date(tp.endDate);
      return date >= start && date <= end;
    });
  };

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (day) =>
    day && year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>📅 일정 캘린더</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
        {/* Calendar grid */}
        <div className="glass-card" style={{ padding: '24px' }}>
          {/* Month navigation */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <button className="btn btn-ghost" onClick={prevMonth}>← 이전</button>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {year}년 {MONTH_NAMES[month]}
            </h2>
            <button className="btn btn-ghost" onClick={nextMonth}>다음 →</button>
          </div>

          {/* Day headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px',
            marginBottom: '8px',
          }}>
            {DAYS.map((d) => (
              <div key={d} style={{
                textAlign: 'center', padding: '8px',
                fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)',
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px',
          }}>
            {cells.map((day, i) => {
              const events = day ? getEventsForDay(day) : [];
              const selected = day === selectedDay;
              return (
                <div
                  key={i}
                  onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                  style={{
                    minHeight: '80px',
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    background: selected
                      ? 'rgba(99, 102, 241, 0.12)'
                      : day ? 'var(--bg-glass)' : 'transparent',
                    border: selected
                      ? '1px solid rgba(99, 102, 241, 0.3)'
                      : '1px solid transparent',
                    cursor: day ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {day && (
                    <>
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: isToday(day) ? 700 : 400,
                        color: isToday(day) ? 'var(--accent-primary)' : 'var(--text-primary)',
                        marginBottom: '4px',
                        width: isToday(day) ? '24px' : 'auto',
                        height: isToday(day) ? '24px' : 'auto',
                        borderRadius: '50%',
                        background: isToday(day) ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                        display: isToday(day) ? 'flex' : 'block',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {day}
                      </div>
                      {events.slice(0, 3).map((ev, j) => (
                        <div
                          key={j}
                          style={{
                            fontSize: '0.6rem',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            background: `${categoryColors[ev.category]}33`,
                            color: categoryColors[ev.category],
                            marginBottom: '2px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                          +{events.length - 3}개
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Category legend */}
          <div style={{
            display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap',
            paddingTop: '16px', borderTop: '1px solid var(--border-color)',
          }}>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: categoryColors[key],
                }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected day details */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
            {selectedDay
              ? `${year}년 ${month + 1}월 ${selectedDay}일 일정`
              : '날짜를 선택하세요'}
          </h3>

          {selectedDay && selectedEvents.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              color: 'var(--text-muted)', fontSize: '0.9rem',
            }}>
              이 날짜에 예정된 일정이 없습니다.
            </div>
          )}

          {selectedEvents.map((ev) => {
            const trainee = getUserById(ev.traineeId);
            return (
              <div
                key={ev.id}
                style={{
                  padding: '14px',
                  marginBottom: '10px',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `3px solid ${categoryColors[ev.category]}`,
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                  {ev.description}
                </div>
                <div style={{
                  display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap',
                }}>
                  <span className="badge" style={{
                    background: `${categoryColors[ev.category]}22`,
                    color: categoryColors[ev.category],
                    fontSize: '0.65rem',
                  }}>
                    {categoryLabels[ev.category]}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {trainee?.avatar} {trainee?.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    진행률 {ev.progress}%
                  </span>
                </div>
              </div>
            );
          })}

          {!selectedDay && (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              color: 'var(--text-muted)', fontSize: '0.85rem',
            }}>
              📅 캘린더에서 날짜를 클릭하면<br />해당 일의 일정을 확인할 수 있습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
