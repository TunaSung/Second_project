-- Active: 1751372420486@@127.0.0.1@3306@second_project

USE `second_project`

INSERT INTO events (title, description, imageUrl, address, startDate, endDate, createdAt, updatedAt)
VALUES
('Sustainable Denim Week', 'Explore pre-loved denim fits, repair tips, and live hemming service.', '/images/events/sustainable-denim-week.jpg', 'No. 100, Sec. 4, Renai Rd, Daan District, Taipei, Taiwan', '2025-10-20', '2025-10-27', NOW(), NOW()),
('Winter Coat Swap', 'Trade your gently used coats and find a new favorite for the season.', '/images/events/winter-coat-swap.jpg', 'No. 7, Xianmin Blvd, Banqiao District, New Taipei City, Taiwan', '2025-10-28', '2025-10-30', NOW(), NOW()),
('Minimalist Wardrobe Clinic', 'Build a 20-piece capsule with hands-on styling guidance.', '/images/events/minimalist-wardrobe-clinic.jpg', 'No. 68, Taiwan Blvd, West District, Taichung, Taiwan', '2025-11-02', '2025-11-04', NOW(), NOW()),
('Holiday Vintage Market', 'Curated vintage stalls, gift wrapping, and hot cocoa corner.', '/images/events/holiday-vintage-market.jpg', 'Pier-2, Dayong Rd, Yancheng District, Kaohsiung, Taiwan', '2025-11-08', '2025-11-10', NOW(), NOW()),
('New Year Capsule Workshop', 'Plan your 2026 outfits with sustainable goals and checklists.', '/images/events/new-year-capsule-workshop.jpg', 'Dongning Rd, East District, Tainan, Taiwan', '2025-11-15', '2025-11-18', NOW(), NOW()),
('Lunar New Year Red Edit', 'All-red and lucky color selection with limited accessories.', '/images/events/lunar-new-year-red-edit.jpg', 'Guangfu Rd, East District, Hsinchu, Taiwan', '2025-11-22', '2025-11-24', NOW(), NOW()),
('City Thrift Run', 'Map-based thrift hunt with team challenges and prizes.', '/images/events/city-thrift-run.jpg', 'Ai 1st Rd, Renai District, Keelung, Taiwan', '2025-11-29', '2025-11-30', NOW(), NOW()),
('Workwear Revival', 'Utility jackets, chore coats, and cargo styling bar.', '/images/events/workwear-revival.jpg', 'Chungyuan Rd, Taoyuan District, Taoyuan, Taiwan', '2025-12-03', '2025-12-07', NOW(), NOW()),
('Neutral Tones Showcase', 'Beige, cream, and taupe looks with live mix-and-match demo.', '/images/events/neutral-tones-showcase.jpg', 'Songzhi Rd, Xinyi District, Taipei, Taiwan', '2025-12-12', '2025-12-15', NOW(), NOW()),
('Street Dance x Style Jam', 'Dance cypher meets secondhand style; bring your best moves.', '/images/events/street-dance-style-jam.jpg', 'Donggyo-ro 27-gil, Mapo-gu, Seoul, South Korea', '2025-12-19', '2025-12-21', NOW(), NOW()),
('Year End Night Market', 'Late-night deals, live DJ, and last-call bundles.', '/images/events/year-end-night-market.jpg', '1-12-1 Shibuya, Shibuya-ku, Tokyo, Japan', '2025-12-27', '2025-12-31', NOW(), NOW()),
('Classic Knit Pop-up', 'Cardigans and crewnecks in classic patterns and textures.', '/images/events/classic-knit-popup.jpg', 'Shinsaibashi, Chuo Ward, Osaka, Japan', '2026-01-05', '2026-01-09', NOW(), NOW()),
('Campus Style Week', 'Student looks, ID discounts, and styling booths.', '/images/events/campus-style-week.jpg', 'Queen''s Rd Central, Central, Hong Kong', '2026-01-12', '2026-01-14', NOW(), NOW()),
('Rainy Day Trench Edit', 'Trench coats and water-friendly fabrics with care tips.', '/images/events/rainy-day-trench-edit.jpg', '333A Orchard Rd, Orchard, Singapore', '2026-01-20', '2026-01-24', NOW(), NOW()),
('Spring Clean Closet Drive', 'Donate, swap, and refresh your wardrobe responsibly.', '/images/events/spring-clean-closet-drive.jpg', 'Siam Square, Pathum Wan, Bangkok, Thailand', '2026-01-27', '2026-02-02', NOW(), NOW()),
('Heritage Patterns Fair', 'Houndstooth, herringbone, and tartan highlights all week.', '/images/events/heritage-patterns-fair.jpg', 'Bukit Bintang, Kuala Lumpur, Malaysia', '2026-02-07', '2026-02-10', NOW(), NOW()),
('Weekend Flash Sale Live', 'Limited-time drops every hour with live hosts.', '/images/events/weekend-flash-sale-live.jpg', 'Nanjing West Rd, Jing''an District, Shanghai, China', '2026-02-15', '2026-02-18', NOW(), NOW()),
('Under 100 Expo', 'Everything under 100 curated by category and size.', '/images/events/under-100-expo.jpg', 'Sanlitun, Chaoyang District, Beijing, China', '2026-02-22', '2026-02-25', NOW(), NOW()),
('Monochrome Outfit Gallery', 'Black and white outfits with photo booth and zine.', '/images/events/monochrome-outfit-gallery.jpg', 'Nguyen Hue, District 1, Ho Chi Minh City, Vietnam', '2026-03-01', '2026-03-03', NOW(), NOW()),
('Sustainable Basics Drop', 'Organic tees, denim essentials, and fair-price staples.', '/images/events/sustainable-basics-drop.jpg', 'Ayala Ave, Makati, Metro Manila, Philippines', '2026-03-10', '2026-03-14', NOW(), NOW());



INSERT INTO categories (name, img)
VALUES
('Tops', "/imgs/category/cloth.jpg"),
('Bottoms', "/imgs/category/pants.jpg"),
('Outerwears', "/imgs/category/outerwear.jpg"),
('Underwears', "/imgs/category/underwear.jpg"),
('Accessories', "/imgs/category/accessories.jpg");

INSERT INTO categories (name, parentId)
VALUES
('T-shirt', 1),
('Shirt', 1),
('Blouse', 1),
('Tank top', 1),
('Vest', 1),
('Sweater', 1),
('Jumper', 1),
('Hoodie', 1),
('Jacket', 1),
('Blazer', 1),
('Suit jacket', 1),
('Sleeveless top', 1),
('Pants', 2),
('Trousers', 2),
('Jeans', 2),
('Shorts', 2),
('Skirt', 2),
('Maxi skirt', 2),
('Mini skirt', 2),
('Skort', 2),
('Trench coat', 3),
('Coat', 3),
('Down jacket', 3),
('Leather jacket', 3),
('Wool coat', 3),
('Track jacket', 3),
('Windbreaker', 3),
('Bra', 4),
('Underwear', 4),
('Panties', 4),
('Briefs', 4),
('Loungewear', 4),
('Pajamas', 4),
('Pyjamas', 4),
('Robe', 4),
('Sports bra', 4),
('Socks', 5),
('Tights', 5),
('Stockings', 5),
('Gloves', 5),
('Scarf', 5),
('Hat', 5),
('Beanie', 5),
('Tie', 5),
('Neck scarf', 5);


SELECT * FROM `msgs`;

INSERT INTO msgs (senderId, receiverId, roomId, content, createdAt, updatedAt)
VALUES
(1, 2, '2_1', '吃使', NOW(), NOW());

SELECT * FROM categories ORDER BY id DESC LIMIT 10;
