USE Data;

/* Here are some query examples:*/
/*1. Show all cities include in the database*/
SELECT * 
FROM City;

/*2. Find data of a city on a specific datetime*/
/*Example query: Find the data of Hue on 2021-03-01 at 04:30*/
SELECT DISTINCT Name, Temperature, Humidity, DateTime 
FROM Weather w, City c
WHERE DateTime = '2021-03-01 04:30:00.000' AND w.Cid = c.Cid AND c.Name = 'Hue';

/*3. Find date contains data with a specific condition (less/greater/between) */
/*Example query 1: Find all days of HCM with temperature <= 28 and wind speed < 10 */
SELECT Name, DatePart(Day,DateTime) as Day, DatePart(Month, DateTime) as Month, Round(Avg(Temperature),2) as AvgTemp, Round(Avg(WindSpeed),2) as AvgSpeed
FROM Weather w, City c
WHERE c.Cid = w.Cid AND w.Cid = 'HCM'
GROUP BY Name, DATEPART(Month, DateTime), DATEPART(Day, DateTime)
HAVING Avg(Temperature) <= 28 AND avg(WindSpeed) < 10
ORDER BY DATEPART(Month, DateTime), DATEPART(Day, DateTime);

/*Example query 2: Find all date and city that has temperature = 26, wind speed = 20 and humidity = 84*/
SELECT DISTINCT Name, Temperature, WindSpeed, Humidity, DateTime
FROM Weather w, City c
WHERE  Temperature = 26 AND WindSpeed = 20 AND Humidity = 84 AND c.Cid = w.Cid;

/*4. Summary of table Weather*/
SELECT Name as City, Min(Temperature) as min_temp, Avg(Temperature) as avg_temp, Max(Temperature) as max_temp,
					 Min(WindSpeed) as min_temp, Avg(WindSpeed) as avg_temp, Max(WindSpeed) as max_temp,
					 Min(Humidity) as min_temp, Avg(Humidity) as avg_temp, Max(Humidity) as max_temp
FROM Weather w INNER JOIN City c ON c.Cid = w.Cid
GROUP BY Name;

/*5. Find min/max/average of a parameter from a city on a given day*/
/*Example query 1: Find minimum wind speed of Hanoi on 2021-04-25*/
SELECT Min(WindSpeed) as min_speed
FROM Weather
WHERE DateTime between '2021-04-25 00:00:00.000' and '2021-04-25 23:59:59.000' and Cid = 'HN';

/*Example query 2: Find maximum temperature of Hue on 2021-05-03*/
SELECT Max(Temperature) as max_temp
FROM Weather
WHERE DateTime between '2021-05-03 00:00:00.000' and '2021-05-03 23:59:59.000' and Cid = 'TTH';

/*Example query 3: Find average humidity of Da Nang on 2021-03-10*/
SELECT Round(Avg(Humidity), 2) as avg_humid
FROM Weather
WHERE DateTime between '2021-03-10 00:00:00.000' and '2021-03-10 23:59:59.000' and Cid = 'DN';

/*6. Find average parameter of each day group by city*/
SELECT Name as City, DatePart(Month, DateTime) as Month, DatePart(Day,DateTime) as Day, ROUND (avg(Temperature),1) as Temp, ROUND(avg(Humidity),2) as Humid, ROUND(avg(WindSpeed),2) as Speed
FROM Weather w, City c
WHERE c.Cid = w.Cid
GROUP BY Name, DATEPART(Month, DateTime), DATEPART(Day, DateTime) 
ORDER BY Name, DATEPART(Month, DateTime), Datepart(Day, DateTime);

/*7. Find days that has average parameter higher than overall average in a city*/
/*Example query: Find days that have average temperature that is less than average temperature of all data in HCM*/
SELECT Cid,  DATEPART(Day, DateTime) as Day, DATEPART(Month, DateTime) as Month, round(avg(Temperature),2) as Average 
FROM Weather 
GROUP BY Cid, DATEPART(Month, DateTime), DATEPART(Day, DateTime)
HAVING Avg(Temperature) > All(SELECT Avg(Temperature) FROM Weather WHERE Cid = 'HCM') and Cid = 'HCM' 
ORDER BY Month, Day;

/*8. Find days that has min parameter less than a specific number in a given month*/
/*Example query: Find days that the minimum temperature in HCM is <= 25 in March*/
SELECT DatePart(Day,DateTime) as Day, MIN(Temperature) Min_Temp
FROM City C INNER JOIN Weather W ON C.Cid = W.Cid 
WHERE C.Name = 'Ho Chi Minh' and DATEPART(Month, DateTime) = 3
Group By DatePart(Day,DateTime)
HAVING MIN(Temperature) <= 25
Order By DatePart(Day,DateTime);

/*9. Find the top 5 hottest/coolest day of a given city*/
/*Example query 1: Find the top 5 day with highest temperature in Da Nang*/
SELECT  TOP(5) Temperature
FROM Weather W, City C
WHERE C.Name = 'Da Nang' and C.Cid = W.Cid
GROUP BY Temperature
ORDER BY Temperature DESC;

/*Example query 2: Find the top 5 day with lowest temperature in Ha Noi*/
SELECT  TOP(5) Temperature
FROM Weather W, City C
WHERE C.Name = 'Ha Noi' and C.Cid = W.Cid
GROUP BY Temperature
ORDER BY Temperature ASC;

/*10. Find city that has more than a specific amount of day having maximum parameter greater than a specific number*/
/*Example query: Find cities that have more than 20 days having humidity > 85*/
SELECT Cid, Count(Cid) as No_of_days 
FROM 
	(Select Cid, DATEPART(Month, DateTime) as Month, DATEPART(Day, DateTime) as Day FROM Weather
	 GROUP BY Cid, DATEPART(Month, DateTime), DATEPART(Day, DateTime)
	 HAVING Avg(Humidity) > 85) as C 
GROUP BY Cid
HAVING Count(Cid) > 20;

/*11. Find average parameter of a period of time in day in a given city*/
/*Example query: Find average humidity in HCM city from 20:00 to 23:30 in 2021-03-17*/
SELECT Round(Avg(Humidity), 2) as avg_humid FROM Weather
WHERE Cid = 'HCM' AND DateTime between '2021-03-17 20:00:00.000' and '2021-03-17 23:30:00.000';

/*Some other queries:*/
/*Bonus 1: Find days that have average temp in Hue that is less than average temperature of all data in HCM */
SELECT Cid,  DATEPART(Day, DateTime) as Day, DATEPART(Month, DateTime) as Month, round(avg(Temperature),2) as Average 
FROM Weather 
GROUP BY Cid, DATEPART(Month, DateTime), DATEPART(Day, DateTime)
HAVING Avg(Temperature) > All(SELECT Avg(Temperature) FROM Weather WHERE Cid = 'HCM') and Cid = 'TTH' 
ORDER BY Month, Day;

/*Bonus 2: Find days does Hue have the humidity equal to the maximum humidity in Da Nang when the temperature is less than minimum temperature in HCM*/
SELECT COUNT(DatePart(Day,DateTime)) Number_of_days
FROM Weather
WHERE Cid = 'TTH' and Humidity = (SELECT MAX(Humidity)
						FROM  Weather
						WHERE Cid = 'DN'
						HAVING MIN(Temperature) < (SELECT MIN(Temperature)
												   FROM Weather
												   WHERE Cid='HCM'));

/*Bonus 3: Find days that Ha Noi has the maximum wind speed > 20 and the maximum temperature > 28 and the maximum humidity > 80 in May*/
SELECT DATEPART(Month, DateTime) Month, DATEPART(Day, DateTime) Day, MAX(WindSpeed) Max_windspeed, MAX(Temperature) Max_temp, Max(Humidity) Max_Humidity
FROM Weather W, City C
WHERE C.Name = 'Ha Noi' and C.Cid = W.Cid and DATEPART(Month, DateTime) = 5
GROUP BY DATEPART(Month, DateTime), DATEPART(Day, DateTime)
HAVING MAX(WindSpeed) > 20 and MAX(Temperature) > 28 and Max(Humidity) > 80;

/*Bonus 4: Find city whose wind speed is greater than or equal to the maximum windspeed of Da Nang in March*/
SELECT Cid
FROM Weather W
WHERE Cid != 'DN' AND DATEPART(Month, DateTime)=3 and  WindSpeed >= (SELECT MAX(WindSpeed)
																	 FROM Weather W, City C
																	 WHERE C.Name = 'Da Nang' and W.Cid=C.Cid and DATEPART(Month, DateTime)=3)
GROUP BY Cid;

/*Bonus 5: Show the data forecast of all cities which do not have wind speed at 5, 10, 15, 20*/
SELECT C.Name, DateTime, WindSpeed
FROM City C, Weather W
WHERE C.Cid=W.Cid and WindSpeed NOT IN (5, 10, 15, 20);