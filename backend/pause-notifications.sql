UPDATE app_state SET data = json_set(data, '$.settings.active', json('false'), '$.settings.backgroundPaused', json('true')), revision = revision + 1 WHERE id = 1;
UPDATE outbox SET sent = 2 WHERE sent = 0;
