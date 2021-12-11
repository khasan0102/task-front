CREATE TABLE boxs(
    box_id SERIAL PRIMARY KEY,
    box_name VARCHAR(32) NOT NULL
);

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    box_id INT NOT NULL REFERENCES boxs(box_id),
    created_at timestamptz default CURRENT_TIMESTAMP
);

insert into 
    boxs (name)
values ('instagram'),
        ('telegram');

insert into 
    cards(box_id)
values (1), (1);


select
	count(c.card_id),
	array_agg(c.created_at::date),
	b.box_name
from cards as c
join boxs as b
on c.box_id = b.box_id 
WHERE extract(YEAR FROM c.created_at) = extract(YEAR FROM now())
				and extract(MONTH FROM c.created_at) = extract(MONTH FROM now())
group by c.created_at::date, b.box_name
order by c.created_at::date


SELECT 
    b.box_name,
    c.box_id
from boxs b 
left join cards c ON c.box_id = b.box_id;


    SELECT 
        DISTINCT (created_at::date)
    from cards;

select 
    (
        select count(c.card_id) as date from cards c
        where c.box_id = b.box_id AND (c.created_at::date) = (NOW()::date)
    ) AS cards_count,
    b.box_name
FROM boxs b;