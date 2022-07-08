import React, { useEffect, useState } from "react";
import moment from "moment";
import back from "../../assets/icons/back.svg";
import next from "../../assets/icons/next.svg";
import "./style.css";
import InputPostalCode from "../InputPostalCode";
import { IndexType } from "typescript";

export default function DatePicker() {
  const till31 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const till30 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const till28 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];

  const [selected, setSelected] = useState<Number | String>("");
  const [monthNow, setMonthNow] = useState<Number | String | any>("");
  const [monthNowName, setMonthNowName] = useState<String>();
  const [dayNow, setDayNow] = useState<Number | String>();
  const [title, setTitle] = useState<Number | String| null | any>("");

  const allMonths = [
    {
      key: 1,
      name: "January",
      firstDayWeek: 5,
      days: till31,
    },
    {
      key: 2,
      name: "February",
      firstDayWeek: 1,
      days: till28,
    },
    {
      key: 3,
      name: "March",
      firstDayWeek: 1,
      days: till31,
    },
    {
      key: 4,
      name: "April",
      firstDayWeek: 4,
      days: till30,
    },
    {
      key: 5,
      name: "May",
      firstDayWeek: 6,
      days: till31,
    },
    {
      key: 6,
      name: "June",
      firstDayWeek: 2,
      days: till30,
    },
    {
      key: 7,
      name: "July",
      firstDayWeek: 4,
      days: till31,
    },
    {
      key: 8,
      name: "August",
      firstDayWeek: 0,
      days: till31,
    },
    {
      key: 9,
      name: "September",
      firstDayWeek: 3,
      days: till30,
    },
    {
      key: 10,
      name: "October",
      firstDayWeek: 5,
      days: till31,
    },
    {
      key: 11,
      name: "November",
      firstDayWeek: 2,
      days: till30,
    },
    {
      key: 12,
      name: "December",
      firstDayWeek: 3,
      days: till31,
    },
  ];

  interface IDays {
    name?: String,
    day?: Number | String | Array<Number | String | null>,
    e?: any
  }

  interface IDay {
    days?: Number | String | Array<Number | String | null> | any,
    day?: Number | String,
    name?: String
  }

  const handkeClick = ({ name, day, e }: IDays) => {
    setTitle(day + " of " + name + " of 2022");
    if (day == e.target.innerText) {
      setSelected(+e.target.innerText);
    }
  };

  const [input, setInput] = useState("");



  const Day = ({ days, day, name }: IDay) => {
    if (days[0] == 0) {
    } else if (day === 1) {
      return days.unshift(0);
    } else if (day === 2) {
      return days.unshift(0, 0);
    } else if (day === 3) {
      return days.unshift(0, 0, 0);
    } else if (day === 4) {
      return days.unshift(0, 0, 0, 0);
    } else if (day === 5) {
      return days.unshift(0, 0, 0, 0, 0);
    } else if (day === 6) {
      return days.unshift(0, 0, 0, 0, 0, 0);
    } else if (day === 7) {
      return days.unshift();
    }

    return days.map(( item:any, i:any ) => {

      const allDatas = {
        name,
        day: days[i],

      }
      return (
        <div
          onClick={(e) => handkeClick({ ...allDatas, e })}
          key={i}
          className={
            item === 0
              ? "day-0"
              : item === dayNow && name === monthNowName
                ? "today"
                : days[i] === selected
                  ? "day-selected"
                  : `day`
          }
        >
          {item}
        </div>
      )
    })
  }





  const initialData = () => {
    const today = moment().date();
    const month = moment().month();
    const monthName = moment().format("MMMM");
    setMonthNow(month + 1);
    setDayNow(today);
    setMonthNowName(monthName);
  };

  useEffect(() => {
    if (monthNow > 12) {
      setMonthNow(1);
    } else if (monthNow < 1) {
      setMonthNow(12);
    }
    setSelected("");
  }, [monthNow]);

  useEffect(() => {
    initialData();
  }, []);


  interface IApi {
    e?: any
  }

  const handleAPI = ({e}:IApi) => {
    //fetchData
    e?.preventDefault();
    if (input === "" || input.length < 5) {
      alert("Postal code should have 5 numbers.")
      return
    }
    alert(
      JSON.stringify({
        date: title,
        postalCode: input,
      })
    );
  };

  return allMonths.map((item, i) => {
    if (item.key === monthNow) {
      return (
        <div key={i} className="wrapper-home">
          <h1>{title}</h1>
          <div className="datepicker">
            <div className="title-button">
              <img
                alt="back"
                onClick={() => setMonthNow(monthNow - 1)}
                className="image-button"
                src={back}
              />
              <h1>{item.name}</h1>
              <h1>2022</h1>
              <img
                alt="next"
                onClick={() => setMonthNow(monthNow + 1)}
                className="image-button"
                src={next}
              />
            </div>
            <div className="week-days">
              <h1>mon</h1>
              <h1>tue</h1>
              <h1>wed</h1>
              <h1>thu</h1>
              <h1>fri</h1>
              <h1>sat</h1>
              <h1>sun</h1>
            </div>
            <div className="all-days">
              <Day
                // selected={selected}
                days={item.days}
                day={item.firstDayWeek}
                name={item.name}
              />
            </div>
          </div>
          <form className="form">
            <InputPostalCode input={input} setInput={setInput} />
            <button onClick={(e) => handleAPI({e})}>Send</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  });
}
