import { Schema, Table, column, PowerSyncDatabase } from "@powersync/react-native";

// Same schema as web app — using v2 column syntax
const storiesTable = new Table({
  title: column.text,
  genre: column.text,
  theme: column.text,
  status: column.text,
  user_id: column.text,
  created_at: column.text,
  updated_at: column.text,
});

const storyChaptersTable = new Table({
  story_id: column.text,
  chapter_number: column.integer,
  title: column.text,
  content: column.text,
  reviewed_content: column.text,
  audio_url: column.text,
  image_url: column.text,
  illustration_prompt: column.text,
  agent_trace: column.text,
  created_at: column.text,
  updated_at: column.text,
});

const agentEventsTable = new Table({
  story_id: column.text,
  agent: column.text,
  event_type: column.text,
  payload: column.text,
  created_at: column.text,
});

export const AppSchema = new Schema({
  stories: storiesTable,
  story_chapters: storyChaptersTable,
  agent_events: agentEventsTable,
});

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "sandsync.db",
  },
});

export type Story = {
  id: string;
  title: string;
  genre: string;
  theme?: string;
  status: "queued" | "generating" | "complete" | "failed";
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type StoryChapter = {
  id: string;
  story_id: string;
  chapter_number: number;
  title: string;
  content: string;
  reviewed_content?: string;
  audio_url?: string;
  image_url?: string;
  illustration_prompt?: string;
  agent_trace?: string;
  created_at: string;
  updated_at: string;
};
