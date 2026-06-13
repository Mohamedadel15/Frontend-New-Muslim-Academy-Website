export type EventType = 'class' | 'qa' | 'gathering' | 'workshop';

export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    image: string;
  };
  startsAt: string;
  durationMinutes: number;
  type: EventType;
  recordingUrl?: string;
  registerUrl?: string;
}
