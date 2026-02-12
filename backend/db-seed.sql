-- DB SEED

-- 1. CLEANUP & RESET IDs ----------------------------------------------------------------------------------------------
TRUNCATE TABLE comments, tracks, projects, users RESTART IDENTITY CASCADE;

-- 2. USERS (Statique) -------------------------------------------------------------------------------------------------
insert into users(id_user, username, band_role, password, "isAdmin", profile_picture)
values (1, 'admin', null, 'admin', true, null),
       (2, 'seb', 'drums', 'sebcamarchepas', false, null),
       (3, 'nico', 'guitar', 'sebcamarchepas', false, null),
       (4, 'antho', 'guitar', 'sebcamarchepas', false, null),
       (5, 'steven', 'bass', 'sebcamarchepas', false, null),
       (6, 'clara', 'vocals', 'sebcamarchepas', false, null);

-- 3. PROJECTS (Créés il y a 10 jours) ----------------------------------------------------------------------------------
insert into projects (id_project, name, description, picture, "creatorIdUser")
values (1, 'Feb studio sesh', 'patrick fury & lights', null, 2),
       (2, 'ooga booga concept EP', 'big brain riffs now allowed, monobrow mandatory', null, 2),
       (3, 'synthwave 2-tracks demo', 'inspired by Miami1984 and Timecop1983 and Yomama1986', null, 2);

-- 4. TRACKS (Uploadés il y a 5 à 7 jours) ------------------------------------------------------------------------------
insert into tracks (id_track, track_name, version, file_url, uploaded_at, "projectIdProject", "uploaderIdUser", "parentTrackIdTrack")
values (1, 'fury', 0.10, '/path/1', now() - interval '7 days', 1, 2, null),
       (2, 'lights', 0.10, '/path/2', now() - interval '6 days', 1, 4, null),
       (3, 'taper', 0.10, '/path/3', now() - interval '5 days', 2, 5, null),
       (4, 'i have to scream but i have no mouth', 0.10, '/path/4', now() - interval '5 days', 2, 5, null),
       (5, 'neon dreams', 0.10, '/path/5', now() - interval '4 days', 3, 3, null),
       (6, 'sunset bvd', 0.10, '/path/6', now() - interval '4 days', 3, 3, null);

-- 5. COMMENTS ---------------------------------------------------------------------------------------------------------
insert into comments (id_comment, content, timestamp, created_at, parent_id, author_id, track_id, project_id)
values
    -- Fil de discussion 1 (Track 2 -> Project 1)
    (1, 'Vraiment top la layer de gratte là...', 67.7, now() - interval '3 days', null, 4, 2, 1),
    (2, 'Je suis d’accord, ça bouffe un peu la voix...', 72.3, now() - interval '3 days' + interval '2 hours', 1, 2, 2, 1),
    (3, 'Ok je baisse de 2 dB...', 74.1, now() - interval '3 days' + interval '4 hours', 2, 1, 2, 1),

    -- Fil de discussion 2 (Track 2 -> Project 1)
    (4, 'Le groove de la batterie est cool...', 15.4, now() - interval '2 days', null, 3, 2, 1),
    (5, 'Oui, on pourrait tester une prise plus loose...', 16.9, now() - interval '2 days' + interval '30 minutes', 4, 4, 2, 1),

    -- Fil de discussion 3 (Track 2 -> Project 1)
    (6, 'La basse est super bien placée...', 33.2, now() - interval '2 days' + interval '5 hours', null, 2, 2, 1),
    (7, 'Merci ! J’hésitais justement à la simplifier.', 34.0, now() - interval '2 days' + interval '6 hours', 6, 3, 2, 1),

    -- Fil de discussion 4 (Track 3 -> Project 2)
    (8, 'Sur cette démo-là, je trouve le tempo un peu rapide.', 0.0, now() - interval '1 day', null, 1, 3, 2),
    (9, 'Ouais, 2 ou 3 BPM de moins ça respirerait plus.', 2.5, now() - interval '1 day' + interval '1 hour', 8, 4, 3, 2),

    -- Fil de discussion 5 (Track 3 -> Project 2)
    (10, 'Le synthé d’intro est cool...', 5.8, now() - interval '1 day' + interval '2 hours', null, 2, 3, 2),
    (11, 'On pourrait le faire rentrer seulement au deuxième couplet.', 42.6, now() - interval '1 day' + interval '3 hours', 10, 1, 3, 2),

    -- Commentaire isolé (Track 3 -> Project 2)
    (12, 'Globalement la démo marche bien.', 90.0, now() - interval '12 hours', null, 3, 3, 2);

-- 6. SEQUENCE SYNC ----------------------------------------------------------------------------------------------------
SELECT setval(pg_get_serial_sequence('users', 'id_user'), coalesce(max(id_user), 1)) FROM users;
SELECT setval(pg_get_serial_sequence('projects', 'id_project'), coalesce(max(id_project), 1)) FROM projects;
SELECT setval(pg_get_serial_sequence('tracks', 'id_track'), coalesce(max(id_track), 1)) FROM tracks;
SELECT setval(pg_get_serial_sequence('comments', 'id_comment'), coalesce(max(id_comment), 1)) FROM comments;