export type VideoInputType = {
  user_id: number;
  description: string;
  video_url: string;
  title: string;
};

export type VideoDBType = {
  created_at: string;
  video_url: string;
  user_id: string;
  title: string;
  description: string;
  num_comments: number;
  id: string;
};
