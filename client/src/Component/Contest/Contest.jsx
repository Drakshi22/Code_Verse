import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getImageUrl,
  getSiteUrl,
  sites,
  list
} from "./Site";
import {
  getCalendarLink,
  showTime,
  showDate
} from "./Time";
import "./style.css";
import { useHistory } from "react-router-dom";

const username = 'anujsharma';
const apiKey = 'c2df952a88a41a9fdc0bf5f9e4ea0a46df424a6a';

export default function Contest() {
  const [contests, setContests] = useState([]);
  const [site, setSite] = useState(["Leetcode", "leetcode.com"]);

  useEffect(() => {
    axios
      .get(
        `https://clist.by/api/v3/contest/?upcoming=true&resource=${site[1]}`,
        {
          headers: {
            Authorization: `ApiKey ${username}:${apiKey}`
          }
        }
      )
      .then((res) => {
        setContests(res.data.objects);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [site]);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
        {list.map((item) => (
          <button
            key={item[1]}
            className={
              site[1] === item[1]
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setSite(item)}
          >
            {item[0]}
          </button>
        ))}
      </div>

      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Upcoming Contests</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Contest</th>
                <th>Site</th>
                <th className="text-center">Date</th>
                <th className="text-center">Start</th>
                <th className="text-center">End</th>
                <th className="text-center">Reminder</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      {item.event}
                    </a>
                  </td>
                  <td>
                    <a href={getSiteUrl(site[1])}>
                      <img
                        src={getImageUrl(site[1])}
                        alt={site[1]}
                        style={{ height: "30px" }}
                      />
                    </a>
                  </td>
                  <td className="text-center">{showDate(item.start)}</td>
                  <td className="text-center">{showTime(item.start)}</td>
                  <td className="text-center">{showTime(item.end)}</td>
                  <td className="text-center">
                    {item.status === "CODING" ? (
                      <span className="badge bg-success">Live</span>
                    ) : (
                      <a
                        href={getCalendarLink(item)}
                        title="Add to Calendar"
                      >
                        <i className="fa fa-calendar-plus-o text-secondary" style={{ fontSize: "20px" }} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {contests.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No upcoming contests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
