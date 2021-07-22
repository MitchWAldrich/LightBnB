INSERT INTO users(name, email, password)
VALUES ('Jackson Thomas', 'jt@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Latoya Jones', 'ltjones@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rohit Bye', 'rbye@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Many Pools Mansion', 'description', 'https://robbreport.com/wp-content/uploads/2020/03/villa-16.jpg', 'https://robbreport.com/wp-content/uploads/2020/03/villa-1.jpg?w=1000', 2400, 6, 4, 14, 'Canada', 'Checker Street', 'Vancouver', 'British Columbia', 'V4N 2R7', true),
(2, 'Cozy Cottage', 'description', 'https://i.imgur.com/dgflhY1.jpeg', 'https://i.imgur.com/u8qejRL.jpeg', 700, 2, 2, 3, 'Canada', 'RR14', 'Tobermory', 'Ontario', 'O7T 2F6', true),
(3, 'Chic in Toronto', 'description', 'https://ec488334f5cc812ff27b-4305dc803c40e6a5a4276e8adc270e96.ssl.cf2.rackcdn.com/65284/photo/1024x768/virtual-tour-65284-photo-15570671065562.jpg', 'https://ec488334f5cc812ff27b-4305dc803c40e6a5a4276e8adc270e96.ssl.cf2.rackcdn.com/65284/photo/1024x768/virtual-tour-65284-photo-15570671104530.jpg', 850, 2, 3, 4, 'Canada', 'Gibbons Rd', 'Toronto', 'Ontario', 'M6K 3L9', true);

INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES ('2021-06-22', '2021-06-29', 1, 1),
('2021-07-13', '2021-07-20', 2, 2),
('2021-04-10', '2021-04-17', 3, 3);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 5, 'message'),
(3, 1, 2, 4, 'message'),
(1, 2, 3, 5, 'message');