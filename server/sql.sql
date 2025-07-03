-- Active: 1751372420486@@127.0.0.1@3306@second_project

USE `second_project`

INSERT INTO events (title, description, imageUrl, startDate, endDate, createdAt, updatedAt) 
VALUES
('夏日清倉特賣會', '清出倉庫最後一波夏季服飾，單件最低只要 $99！', '/images/events/summer-sale.jpg', '2025-07-05', '2025-07-10', NOW(), NOW()),
('開學季返校特惠', '學生專屬優惠！輸入學號享額外折扣', '/images/events/back-to-school.jpg', '2025-07-12', '2025-07-20', NOW(), NOW()),
('週末限時快閃', '只有週末限定！熱門單品 5 折起', '/images/events/weekend-flash.jpg', '2025-07-19', '2025-07-21', NOW(), NOW()),
('首次註冊送購物金', '新會員註冊立即獲得 $100 購物金', '/images/events/new-user.jpg', '2025-07-22', '2025-08-01', NOW(), NOW()),
('換季服飾折扣週', '秋冬換季來臨，舊品通通 7 折出清', '/images/events/season-change.jpg', '2025-08-03', '2025-08-10', NOW(), NOW()),
('百元有找專區上架', '精選百元內高品質衣物上架啦！快來撿便宜！', '/images/events/under-100.jpg', '2025-08-12', '2025-08-18', NOW(), NOW()),
('熱銷 TOP10 投票', '選出你最愛的二手穿搭！參加投票抽好禮', '/images/events/top10-vote.jpg', '2025-08-20', '2025-08-25', NOW(), NOW()),
('二手衣穿搭挑戰賽', '上傳你的創意穿搭，贏得 NT$1,000 購物金', '/images/events/style-challenge.jpg', '2025-08-27', '2025-09-05', NOW(), NOW()),
('舊衣換購活動', '拿舊衣來換購指定新品，再享 9 折', '/images/events/exchange.jpg', '2025-09-07', '2025-09-15', NOW(), NOW()),
('會員感謝月', '感謝一路支持，會員全館免運 + 點數 2 倍送', '/images/events/member-thanks.jpg', '2025-09-17', '2025-09-30', NOW(), NOW());
