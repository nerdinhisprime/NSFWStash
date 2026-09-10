CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    preview_path TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    media_type VARCHAR(5) NOT NULL CHECK (media_type IN ('image', 'video')),
    size INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
