export type VideoInputType = {
  description: string;
  video_url: string;
  title: string;
};

export type VideoInputTypeWithUser = VideoDbType & { user_id: string };

export type VideoDbType = {
  created_at: string;
  video_url: string;
  user_id: string;
  title: string;
  description: string;
  num_comments: number;
  id: string;
};

export type VideoDomainType = {
  video_url: string;
  title: string;
  description: string;
  id: string;
};

export type CommentInputType = {
  video_id: string;
  content: string;
  user_id: string;
};

export type CommentDomainType = {
  video_id: string;
  content: string;
  user_id: string;
  created_at: string;
};

export type CommentDbType = {
  content: string;
  user_id: string;
  video_id: string;
  id: string;
  created_at: string;
};
